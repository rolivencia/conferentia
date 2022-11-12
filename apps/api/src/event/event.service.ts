import { Injectable } from '@nestjs/common';
import { IEvent } from '@conferentia/models';
import { ConnectorService } from '../shared/connectors/connector.service';
import { SubjectAreaService } from '../subject-area/subject-area.service';

import imageUrlBuilder from '@sanity/image-url';
import { SponsorService } from '../sponsor/sponsor.service';

@Injectable()
export class EventService {
  constructor(
    private connectorService: ConnectorService,
    private sponsorService: SponsorService,
    private subjectAreaService: SubjectAreaService
  ) {}

  public async get(id: number): Promise<IEvent> {
    const builder = imageUrlBuilder(this.connectorService.connector);
    const query = `*[_type == 'event' && _id == '${id}']
                    { _id, _createdAt, _updatedAt, _type, _rev,
                     name, featuredImage, logo, start_date, end_date, sponsors[]->}`;
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
      featuredImage: result.featuredImage
        ? {
            alt: result.featuredImage.alt,
            url: builder.image(result.featuredImage).url(),
          }
        : null,
      logo: result.logo ? builder.image(result.logo).url() : null,
      sponsors: result.sponsors.map((sponsor) => ({
        ...sponsor,
        image: builder.image(sponsor.image).url(),
      })),
    };
  }

  public async getAll(): Promise<IEvent[]> {
    const query = `*[_type == 'event']`;
    const result = await this.connectorService.connector.fetch(query, {});
    return result as IEvent[];
  }
}
