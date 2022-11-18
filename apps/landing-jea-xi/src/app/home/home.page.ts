import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEvent } from '../../../../../libs/models/src';
import { EventService } from '../../../../../libs/angular-services/src';

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
