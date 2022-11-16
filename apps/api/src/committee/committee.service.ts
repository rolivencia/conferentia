// Core
import { Injectable } from '@nestjs/common';

// Data Transformation
import imageUrlBuilder from '@sanity/image-url';
import {
  EntitySortingService,
  Sortable,
  SortableEntity,
} from '@conferentia/nest-modules';

// Interfaces
import { ICommitteeArea } from '@conferentia/models';

// Services
import { ConnectorService } from '../shared/connectors/connector.service';

@Injectable()
export class CommitteeService {
  constructor(
    private connectorService: ConnectorService,
    private entitySortingService: EntitySortingService<ICommitteeArea>
  ) {}

  public async getAreas(eventId: number | string): Promise<ICommitteeArea[]> {
    const builder = imageUrlBuilder(this.connectorService.connector);
    const query = `*[_type == 'committeeArea' && references('${eventId}')]
                    {_id, _createdAt, _updatedAt, _type, _rev, name, chairs[]->, viceChairs[]->, members[]->, order } | order(order)`;
    const result = await this.connectorService.connector.fetch(query, {});
    // ToDo: #60 - Remove code duplication when fetching sorted domain entities, via use of the Sorting design pattern (RO - 2022/11/15)
    return result
      .map((x) => {
        const { order, ...entity } = x;
        return { order, entity } as SortableEntity<ICommitteeArea>;
      })
      .map((x: Sortable) => {
        const committeeArea = this.entitySortingService.unwrap(
          x as SortableEntity<ICommitteeArea>
        );
        if (committeeArea.chairs) {
          committeeArea.chairs = committeeArea.chairs.map((member) => ({
            ...member,
            avatar: member.avatar
              ? builder.image(member.avatar).url()
              : undefined,
          }));
        }
        if (committeeArea.members) {
          committeeArea.members = committeeArea.members.map((member) => ({
            ...member,
            avatar: member.avatar
              ? builder.image(member.avatar).url()
              : undefined,
          }));
        }
        return committeeArea;
      }) as ICommitteeArea[];
  }
}
