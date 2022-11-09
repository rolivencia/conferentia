import { Injectable } from '@nestjs/common';
import { ConnectorService } from '../shared/connectors/connector.service';
import { ISubjectArea } from '@conferentia/models';

@Injectable()
export class SubjectAreaService {
  constructor(private connectorService: ConnectorService) {}

  public async get(eventId: number | string) {
    const query = `*[_type == 'subjectArea' && references('${eventId}')]
                   {_id, _createdAt, _updatedAt, _type, _rev, name, image, event->}`;
    const result = await this.connectorService.connector.fetch(query, {});
    return result as ISubjectArea[];
  }
}
