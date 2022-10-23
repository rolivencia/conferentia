import { Injectable } from '@nestjs/common';
import { IEvent } from '@conferentia/models';
import { ConnectorService } from '../shared/connectors/connector.service';

// ToDo: Get rid of this array once the connection with Sanity CMS is made (INF - #1)
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
  constructor(private connectorService: ConnectorService) {}

  public async get(id: number): Promise<IEvent> {
    const query = `*[_type == 'event' && _id == '${id}']`;
    const result = await this.connectorService.connector.fetch(query, {});
    return result.length > 0 ? result.pop() : null;
  }

  public async getAll(): Promise<IEvent[]> {
    const query = await this.connectorService.connector.fetch(`*`, {});
    return query as IEvent[];
  }
}
