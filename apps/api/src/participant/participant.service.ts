import { Injectable } from '@nestjs/common';
import { ConnectorService } from '../shared/connectors/connector.service';
import { IParticipant } from '@conferentia/models';
import imageUrlBuilder from '@sanity/image-url';

@Injectable()
export class ParticipantService {
  constructor(private connectorService: ConnectorService) {}

  public async getByEventId(eventId: number | string): Promise<IParticipant[]> {
    const builder = imageUrlBuilder(this.connectorService.connector);
    const query = `*[_type == 'participant' && references('${eventId}')]
                    { _id, _createdAt, _updatedAt, _type, _rev,
                     title, courtesyName, firstName, lastName, avatar, description }`;
    const result: IParticipant[] = await this.connectorService.connector.fetch(
      query,
      {}
    );

    // ToDo: #60 - Remove code duplication when fetching sorted domain entities, via use of the Sorting design pattern (RO - 2022/11/15)
    return result.map((participant) => ({
      ...participant,
      image: builder.image(participant.avatar).url(),
    }));
  }
}
