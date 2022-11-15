// Core
import { Injectable } from '@nestjs/common';

// Interfaces
import { ICommitteeArea } from '@conferentia/models';
import { Sortable } from '@conferentia/nest-modules';

// Services
import { ConnectorService } from '../shared/connectors/connector.service';

@Injectable()
export class CommitteeService {
  constructor(private connectorService: ConnectorService) {}

  public async getAreas(eventId: number | string): Promise<ICommitteeArea[]> {
    const query = `*[_type == 'committeeArea' && references('${eventId}')]
                    {_id, _createdAt, _updatedAt, _type, _rev, name, chairs[]->, viceChairs[]->, members[]->, order } | order(order)`;
    const result = await this.connectorService.connector.fetch(query, {});
    // ToDo: #60 - Remove code duplication when fetching sorted domain entities, via use of the Sorting design pattern (RO - 2022/11/15)
    return result.map((x: Sortable) => {
      const { order, ...entity } = x;
      return entity;
    }) as ICommitteeArea[];
  }
}
