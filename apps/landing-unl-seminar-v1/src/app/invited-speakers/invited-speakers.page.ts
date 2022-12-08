import { Component, inject } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IEvent, IParticipant } from '@conferentia/models';
import {
  EventService,
  ParticipantService,
} from '@conferentia/angular-services';

@Component({
  selector: 'conferentia-invited-speakers',
  templateUrl: './invited-speakers.page.html',
  styleUrls: ['./invited-speakers.page.scss'],
})
export class InvitedSpeakersPage {
  public participantCategories$: Observable<
    | {
        name: string;
        participants: IParticipant[];
      }[]
    | null
  > = of(null);
  public currentEvent$: Observable<IEvent | null> = of(null);

  constructor() {
    const eventService = inject(EventService);
    const participantService = inject(ParticipantService);
    this.currentEvent$ = eventService.currentEvent$.asObservable();
    this.participantCategories$ = this.currentEvent$.pipe(
      switchMap((event) =>
        participantService.getByEventId((event as IEvent)._id)
      ),
      switchMap((participants) => {
        const participantCategories: {
          name: string;
          participants: IParticipant[];
        }[] = [];

        speakerTypes.forEach((type) => {
          participantCategories.push({
            name: type.value,
            participants: participants
              .filter((participant) => participant.role === type.key)
              .sort(sortByLastName),
          });
        });

        return of(participantCategories);
      })
    );
  }
}

// ToDo: Read the types from the database to generate the categories programmatically (RO - 2022/12/08)
const speakerTypes = [
  { key: 'plenary', value: 'Plenary Conferences' },
  { key: 'keynote', value: 'Keynote' },
  { key: 'oral-presentations', value: 'Oral Presentations' },
];

const sortByLastName = (a: IParticipant, b: IParticipant) => {
  if (a.lastName > b.lastName) {
    return 1;
  } else if (a.lastName < b.lastName) {
    return -1;
  } else {
    return sortByFirstName(a, b);
  }
};

const sortByFirstName = (a: IParticipant, b: IParticipant) => {
  if (a.firstName > b.firstName) {
    return 1;
  } else if (a.firstName < b.firstName) {
    return -1;
  } else {
    return 0;
  }
};
