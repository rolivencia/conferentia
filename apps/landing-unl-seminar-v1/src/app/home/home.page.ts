// Core
import { Component, inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

// Models
import { IEvent } from '@conferentia/models';

// Services
import { EventService } from '@conferentia/angular-services';

@Component({
  selector: 'conferentia-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public currentEvent$: Observable<IEvent | null> = of(null);

  constructor() {
    const eventService = inject(EventService);
    this.currentEvent$ = eventService.currentEvent$.asObservable();
  }

  ngOnInit() {}
}
