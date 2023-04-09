// Core
import { Injectable } from '@nestjs/common';

// Models
import { IActivity, Schedule } from '@conferentia/models';

// Services
import { ConnectorService } from '../shared/connectors/connector.service';

// Libraries
import dayjs from 'dayjs';
import imageUrlBuilder from '@sanity/image-url';

@Injectable()
export class ActivityService {
  constructor(private connectorService: ConnectorService) {}

  public async getActivityById(
    activityId: number | string
  ): Promise<IActivity> {
    const builder = imageUrlBuilder(this.connectorService.connector);
    const query = `*[_type == 'activities' && _id == '${activityId}'][0]
                          {
                            _id,
                            _createdAt,
                            _updatedAt,
                            _type,
                            _rev,
                            title,
                            type->{name, fontColor, backgroundColor, image},
                            image,
                            participants[]->,
                            description,
                            startDate,
                            endDate
                          }`;
    const result: any = await this.connectorService.connector.fetch(query, {});

    return {
      ...result,
      participants: result.participants
        ? result.participants.map((participant: any) => ({
            ...participant,
            avatar: participant.avatar
              ? builder.image(participant.avatar).url()
              : null,
          }))
        : [],
      type: {
        ...result.type,
        backgroundColor: result.type?.backgroundColor?.hex,
        fontColor: result.type?.fontColor?.hex,
      },
      image: result.image ? builder.image(result.image).url() : undefined,
    } as IActivity;
  }

  public async getScheduleByEventId(
    eventId: number | string
  ): Promise<Schedule> {
    const builder = imageUrlBuilder(this.connectorService.connector);
    const query = `*[_type == 'activities' && references('${eventId}')]
                    {
                      _id,
                      _createdAt,
                      _updatedAt,
                      _type,
                      _rev,
                      title,
                      type->{name, fontColor, backgroundColor, image},
                      image,
                      participants[]->,
                      description,
                      startDate,
                      endDate
                    }  | order(startDate)`;
    const result: any[] = await this.connectorService.connector.fetch(
      query,
      {}
    );

    // ToDo: #60 - Remove code duplication when fetching sorted domain entities, via use of the Sorting design pattern (RO - 2022/11/15)
    const activities = result.map(({ type, ...activity }) => ({
      ...activity,
      type: {
        ...type,
        backgroundColor: type?.backgroundColor?.hex,
        fontColor: type?.fontColor?.hex,
      },
      image: activity.image ? builder.image(activity.image).url() : undefined,
    }));

    // Hosts the list of days of event activities
    const eventDays: Set<string> = new Set<string>();
    activities.forEach((activity) => {
      eventDays.add(dayjs(activity.startDate).format('YYYY-MM-DD'));
    });

    // Builds the objects with days and the activities for each day
    let schedule: Schedule = [];
    eventDays.forEach((day) => {
      schedule.push({
        day: dayjs(day).format('dddd, D MMMM'),
        activities: activities.filter(
          (activity) => day === activity.startDate.toString().split('T')[0]
        ),
      });
    });

    return schedule;
  }
}
