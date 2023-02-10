import { Component, OnInit } from '@angular/core';
import { AbstractService, EventService } from '@conferentia/angular-services';
import { Observable, of, switchMap } from 'rxjs';
import { Abstract, IEvent } from '@conferentia/models';

@Component({
  selector: 'conferentia-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  public abstracts$: Observable<Abstract[]> = of([]);
  public currentEvent$: Observable<IEvent | null> = of(null);

  constructor(
    private abstractService: AbstractService,
    private eventService: EventService
  ) {
    this.currentEvent$ = eventService.currentEvent$;
  }

  ngOnInit() {
    this.abstracts$ = this.currentEvent$.pipe(
      switchMap((event) =>
        this.abstractService.getByEventId((event as IEvent)._id)
      )
    );
  }
}
