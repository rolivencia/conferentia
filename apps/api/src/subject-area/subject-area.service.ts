import { Injectable } from '@nestjs/common';
import { ConnectorService } from '../shared/connectors/connector.service';
import { ISubjectArea } from '@conferentia/models';

import imageUrlBuilder from '@sanity/image-url';
import { Sortable } from '@conferentia/nest-modules';

@Injectable()
export class SubjectAreaService {
  constructor(private connectorService: ConnectorService) {}

  /**
   * Retrieves all the information belonging to an event subject, including the event to
   * which each one belongs to as a property.
   * @param eventId
   */
  public async get(eventId: number | string): Promise<ISubjectArea[]> {
    const builder = imageUrlBuilder(this.connectorService.connector);
    const query = `*[_type == 'subjectArea' && references('${eventId}')]
                   {_id, _createdAt, _updatedAt, _type, _rev, name, image, order, event-> } | order(order)`;
    const result = await this.connectorService.connector.fetch(query, {});
    return result
      .map((subjectArea) => ({
        ...subjectArea,
        image: builder.image(subjectArea.image).url(),
      }))
      // ToDo: #60 - Remove code duplication when fetching sorted domain entities, via use of the Sorting design pattern (RO - 2022/11/15)
      .map((x: Sortable) => {
        const { order, ...entity } = x;
        return entity;
      }) as ISubjectArea[];
  }

  /**
   * This services retrieves the information for an event subject areas without
   * including the event as property of each.
   * @param eventId
   */
  public async getForEvent(eventId: number | string): Promise<ISubjectArea[]> {
    const builder = imageUrlBuilder(this.connectorService.connector);
    const query = `*[_type == 'subjectArea' && references('${eventId}')]
                   {_id, _createdAt, _updatedAt, _type, _rev, name, image, order } | order(order)`;
    const result = await this.connectorService.connector.fetch(query, {});
    return result
      .map((subjectArea) => ({
        ...subjectArea,
        image: builder.image(subjectArea.image).url(),
      }))
      // ToDo: #60 - Remove code duplication when fetching sorted domain entities, via use of the Sorting design pattern (RO - 2022/11/15)
      .map((x: Sortable) => {
        const { order, ...entity } = x;
        return entity;
      }) as ISubjectArea[];
  }
}
