import { Injectable } from '@nestjs/common';
import { ConnectorService } from '../shared/connectors/connector.service';
import { ICommitteeArea } from '@conferentia/models';

@Injectable()
export class CommitteeService {
  constructor(private connectorService: ConnectorService) {}

  public async getAreas(eventId: number | string): Promise<ICommitteeArea[]> {
    const query = `*[_type == 'committeeArea' && references('${eventId}')]
                    {_id, _createdAt, _updatedAt, _type, _rev, name, chairs[]->, viceChairs[]->, members[]->, order } | order(order)`;
    const result = await this.connectorService.connector.fetch(query, {});
    return result.map((x) => {
      const { order, ...entity } = x;
      return entity;
    }) as ICommitteeArea[];
  }
}
