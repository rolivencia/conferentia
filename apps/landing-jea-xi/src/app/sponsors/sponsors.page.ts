import { Component, inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEvent } from '../../../../../libs/models/src';
import { EventService } from '../../../../../libs/angular-services/src';

@Component({
  selector: 'conferentia-sponsors',
  templateUrl: './sponsors.page.html',
  styleUrls: ['./sponsors.page.scss'],
})
export class SponsorsPage {
  public currentEvent$: Observable<IEvent | null> = of(null);

  constructor() {
    const eventService = inject(EventService);
    this.currentEvent$ = eventService.currentEvent$.asObservable();
  }
}
