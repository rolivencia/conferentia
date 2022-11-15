import { Injectable } from '@nestjs/common';
import { ConnectorService } from '../shared/connectors/connector.service';
import { IEventSponsor } from '@conferentia/models';
import imageUrlBuilder from '@sanity/image-url';
import { Sortable } from '@conferentia/nest-modules';

@Injectable()
export class SponsorService {
  constructor(private connectorService: ConnectorService) {}

  public async getByEventId(
    eventId: number | string
  ): Promise<IEventSponsor[]> {
    const builder = imageUrlBuilder(this.connectorService.connector);
    const query = `*[_type == 'sponsor' && references('${eventId}')]
                   {_id, _createdAt, _updatedAt, _type, _rev, name, image, url, order } | order(order)`;
    const queryResult = await this.connectorService.connector.fetch(query, {});

    return queryResult
      .map((element) => ({
        ...element,
        image: builder.image(element.image).url(),
      }))
      .map((x: Sortable) => {
        const { order, ...entity } = x;
        return entity;
      }) as IEventSponsor[];
  }
}
