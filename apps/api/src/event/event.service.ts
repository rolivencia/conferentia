import { Injectable } from '@nestjs/common';
import { IEvent } from '@conferentia/models';
import { ConnectorService } from '../shared/connectors/connector.service';

@Injectable()
export class EventService {
  constructor(private connectorService: ConnectorService) {}

  public async get(id: number): Promise<IEvent> {
    const query = `*[_type == 'event' && _id == '${id}']`;
    const result = await this.connectorService.connector.fetch(query, {});
    return result.length > 0 ? (result.pop() as IEvent) : null;
  }

  public async getAll(): Promise<IEvent[]> {
    const query = `*[_type == 'event']`;
    const result = await this.connectorService.connector.fetch(query, {});
    return result as IEvent[];
  }
}
