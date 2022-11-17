import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEvent } from '@conferentia/models';
import { EventService } from '@conferentia/angular-services';

@Component({
  selector: 'conferentia-abstract-submission',
  templateUrl: './abstract-submission.page.html',
  styleUrls: ['./abstract-submission.page.scss'],
})
export class AbstractSubmissionPage {
  public currentEvent$: Observable<IEvent | null> = of(null);

  constructor() {
    const eventService = inject(EventService);
    this.currentEvent$ = eventService.currentEvent$.asObservable();
  }
}
