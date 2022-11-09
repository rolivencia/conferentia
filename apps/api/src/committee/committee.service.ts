import { Injectable } from '@nestjs/common';
import { ConnectorService } from '../shared/connectors/connector.service';
import { ICommitteeArea, IEvent } from '@conferentia/models';

@Injectable()
export class CommitteeService {
  constructor(private connectorService: ConnectorService) {}

  public async getAreas(eventId: number | string) {
    const query = `*[_type == 'committeeArea' && references('${eventId}')]
                    {_id, _createdAt, _updatedAt, _type, _rev, name, event->, chairs[]->, viceChairs[]->, members[]->}`;
    const result = await this.connectorService.connector.fetch(query, {});
    return result as ICommitteeArea[];
  }
}
