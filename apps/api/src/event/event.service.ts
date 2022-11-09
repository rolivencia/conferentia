import { Injectable } from '@nestjs/common';
import { IEvent } from '@conferentia/models';
import { ConnectorService } from '../shared/connectors/connector.service';
import { SubjectAreaService } from '../subject-area/subject-area.service';

import imageUrlBuilder from '@sanity/image-url';

@Injectable()
export class EventService {
  constructor(
    private connectorService: ConnectorService,
    private subjectAreaService: SubjectAreaService
  ) {}

  public async get(id: number): Promise<IEvent> {
    const builder = imageUrlBuilder(this.connectorService.connector);
    const query = `*[_type == 'event' && _id == '${id}']`;
    const queryResult: IEvent[] = await this.connectorService.connector.fetch(
      query,
      {}
    );

    const result = queryResult.length > 0 ? queryResult.pop() : null;

    // Fetch subject areas belonging to the event
    if (!!result) {
      result.subjectAreas = await this.subjectAreaService.getForEvent(id);
    }

    return {
      ...result,
      image: result.image ? builder.image(result.image).url() : null,
    };
  }

  public async getAll(): Promise<IEvent[]> {
    const query = `*[_type == 'event']`;
    const result = await this.connectorService.connector.fetch(query, {});
    return result as IEvent[];
  }
}
