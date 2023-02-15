import { Inject, Injectable } from '@angular/core';
import { IFrontendEnvironmentConfig, Schedule } from '@conferentia/models';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable, of, switchMap } from 'rxjs';

// Libraries
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService extends HttpService {
  constructor(
    protected override http: HttpClient,
    @Inject('env') protected override env: IFrontendEnvironmentConfig
  ) {
    super(http, env, 'activity');
  }

  public getByEventId(eventId: number | string): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.prefix}/${eventId}`).pipe(
      switchMap((schedule) => {
        return of(
          schedule.map((scheduleDay) => ({
            ...scheduleDay,
            activities: scheduleDay.activities.map((activity) => ({
              ...activity,
              startDate: formatActivitiesTime(activity.startDate),
              endDate: formatActivitiesTime(activity.endDate),
            })),
          }))
        );
      })
    );
  }
}

const formatActivitiesTime = (dateTime: string | Date) =>
  dayjs(dateTime).format('hh:mm');
