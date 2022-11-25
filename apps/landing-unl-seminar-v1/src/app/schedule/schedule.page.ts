import { Component, inject } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IEvent, Schedule } from '@conferentia/models';
import { ActivityService, EventService } from '@conferentia/angular-services';

@Component({
  selector: 'conferentia-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {
  public schedule$: Observable<Schedule | null> = of(null);
  public currentEvent$: Observable<IEvent | null> = of(null);

  constructor() {
    const eventService = inject(EventService);
    const activityService = inject(ActivityService);
    this.currentEvent$ = eventService.currentEvent$.asObservable();
    this.schedule$ = this.currentEvent$.pipe(
      switchMap((event) => activityService.getByEventId((event as IEvent)._id))
    );
  }
}
