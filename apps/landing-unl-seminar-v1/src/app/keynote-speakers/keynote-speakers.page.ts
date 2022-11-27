import { Component, inject } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IEvent, IParticipant } from '@conferentia/models';
import {
  EventService,
  ParticipantService,
} from '@conferentia/angular-services';

@Component({
  selector: 'conferentia-keynote-speakers',
  templateUrl: './keynote-speakers.page.html',
  styleUrls: ['./keynote-speakers.page.scss'],
})
export class KeynoteSpeakersPage {
  public participants$: Observable<IParticipant[] | null> = of(null);
  public currentEvent$: Observable<IEvent | null> = of(null);

  constructor() {
    const eventService = inject(EventService);
    const participantService = inject(ParticipantService);
    this.currentEvent$ = eventService.currentEvent$.asObservable();
    this.participants$ = this.currentEvent$.pipe(
      switchMap((event) =>
        participantService.getByEventId((event as IEvent)._id)
      )
    );
  }
}
