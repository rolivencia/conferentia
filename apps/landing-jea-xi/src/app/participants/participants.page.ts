import { Component, inject, OnInit } from '@angular/core';
import {
  EventService,
  ParticipantService,
} from '../../../../../libs/angular-services/src';
import { map, Observable, of, switchMap } from 'rxjs';
import { IEvent, IParticipant } from '../../../../../libs/models/src';
import dayjs from 'dayjs';

@Component({
  selector: 'conferentia-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage {
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
