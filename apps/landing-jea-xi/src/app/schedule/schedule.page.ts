import { Component, inject } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { IActivity, IEvent } from '@conferentia/models';
import { ActivityService, EventService } from '@conferentia/angular-services';
import dayjs from 'dayjs'

@Component({
  selector: 'conferentia-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {
  public activities$: Observable<IActivity[] | null> = of(null);
  public currentEvent$: Observable<IEvent | null> = of(null);

  constructor() {
    const eventService = inject(EventService);
    const activityService = inject(ActivityService);
    this.currentEvent$ = eventService.currentEvent$.asObservable();
    this.activities$ = this.currentEvent$.pipe(
      switchMap((event) => activityService.getByEventId((event as IEvent)._id)),
      map((activities) =>
        activities.map((activity) => ({
          ...activity,
          startDate: dayjs(activity.startDate).format('HH:mm'),
          endDate: dayjs(activity.endDate).format('HH:mm'),
        }))
      )
    );
  }
}
