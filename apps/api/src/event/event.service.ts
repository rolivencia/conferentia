import { Injectable } from '@nestjs/common';
import { IEvent } from '@conferentia/models';

// TODO: Get rid of this array once the connection with Sanity CMS is made
const events = [
  {
    id: 1,
    name: 'Conf',
    activities: [
      { id: 1, title: 'Acto de Apertura' },
      { id: 2, title: 'Primera Charla' },
      { id: 3, title: 'Coffee Break' },
      { id: 4, title: 'Charla Magistral' },
      { id: 5, title: 'Acto de Cierre' },
    ],
  },
];

@Injectable()
export class EventService {
  public get(id: number): IEvent {
    return events.filter((event) => event.id === id).pop();
  }
}
