import { Get, Injectable, Param } from '@nestjs/common';
import { IActivity, IEvent } from '@conferentia/models';
import imageUrlBuilder from '@sanity/image-url';
import { ConnectorService } from '../shared/connectors/connector.service';

@Injectable()
export class ActivityService {
  constructor(private connectorService: ConnectorService) {}

  public async getByEventId(eventId: number | string): Promise<IActivity[]> {
    const builder = imageUrlBuilder(this.connectorService.connector);
    const query = `*[_type == 'activities' && references('${eventId}')]
                    { _id, _createdAt, _updatedAt, _type, _rev,
                     title, image, participants[]->, description, startDate, endDate }  | order(startDate)`;
    const result: IActivity[] = await this.connectorService.connector.fetch(
      query,
      {}
    );

    // ToDo: #60 - Remove code duplication when fetching sorted domain entities, via use of the Sorting design pattern (RO - 2022/11/15)
    return result.map((activity) => ({
      ...activity,
      image: builder.image(activity.image).url(),
    }));
  }
}
