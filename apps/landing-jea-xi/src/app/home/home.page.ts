import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEvent } from '@conferentia/models';
import { EventService } from '@conferentia/angular-services';

@Component({
  selector: 'conferentia-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public currentEvent$: Observable<IEvent | null> = of(null);

  constructor() {
    const eventService = inject(EventService);
    this.currentEvent$ = eventService.currentEvent$.asObservable();
  }
}
