import { Injectable } from '@nestjs/common';
import { ConnectorService } from '../shared/connectors/connector.service';
import { SanityClient } from '@sanity/client';
import { Abstract, SubmittedAbstractPayload } from '@conferentia/models';
import * as fs from 'fs';
import { SubmittedAbstractRevisionPayload } from '../../../../libs/models/src/lib/abstract.interface';

@Injectable()
export class AbstractService {
  // ToDo: Check on how to programatically assign the typing to the connector (RO - 2022/12/05 - #105)
  private connector: SanityClient;

  constructor(private connectorService: ConnectorService) {
    this.connector = this.connectorService.connector as SanityClient;
  }

  public async getAll(eventId: string): Promise<Abstract[]> {
    const query = `*[_type == 'abstract' && references('${eventId}')]
                  {
                        _id,
                        _createdAt,
                        _updatedAt,
                        _type,
                        _rev,
                        event->,
                        user->,
                        title,
                        identifier,
                        keywords,
                        status,
                        format,
                        subjectArea->,
                        authors[]->,
                        pdfFile{ url },
                        review,
                        posterUrl
                  } | order(identifier)
                  `;
    const results = await this.connector.fetch(query, {});
    return results
      .map((abstract) => this.mapResponse(abstract))
      .sort((x: Abstract, y: Abstract) =>
        x.identifier.localeCompare(y.identifier, undefined, {
          numeric: true,
          sensitivity: 'base',
        })
      );
  }

  public async getByUserId(userId: string): Promise<Abstract[]> {
    const query = `*[_type == 'abstract' && references('${userId}')]
                  {
                        _id,
                        _createdAt,
                        _updatedAt,
                        _type,
                        _rev,
                        event->,
                        user->,
                        title,
                        identifier,
                        keywords,
                        status,
                        format,
                        subjectArea->,
                        authors[]->,
                        pdfFile{ url },
                        review,
                        posterUrl
                  }
                  `;

    const result: any[] = await this.connector.fetch(query, {});
    return result.map((abstract) => this.mapResponse(abstract));
  }

  public async getById(id: string): Promise<Abstract> {
    const query = `*[_type == 'abstract' && _id == '${id}'][0]
                  {
                        _id,
                        _createdAt,
                        _updatedAt,
                        _type,
                        _rev,
                        event->,
                        user->,
                        title,
                        identifier,
                        keywords,
                        status,
                        format,
                        subjectArea->,
                        authors[]->,
                        pdfFile{ url },
                        review,
                        posterUrl
                  }
                  `;
    const result = await this.connector.fetch(query, {});
    return this.mapResponse(result);
  }

  public async create(payload: SubmittedAbstractPayload) {
    const fileUploaded = await this.uploadAbstractFile(payload.abstract.file);
    if (!fileUploaded) {
      throw new Error('Transaction failed when uploading the abstract file.');
    }

    // Start transaction to add authors
    let authorsTransaction = this.connector.transaction();

    // Add authors to the transaction
    for (const author of payload.abstract.authors) {
      authorsTransaction = authorsTransaction.create({
        _type: 'author',
        firstName: author.firstName,
        lastName: author.lastName,
        institution: author.institution,
      });
    }

    // Assign the IDs of the inserted authors in a variable
    const authorIds = (await authorsTransaction.commit().catch()).documentIds;

    if (!authorIds) {
      throw new Error('Transaction failed when persisting abstract authors.');
    }

    // Add abstract document to the transaction
    const abstractTransaction = this.connector.transaction().create({
      _type: 'abstract',
      identifier: await this.generateIdentifier(),
      event: { _type: 'reference', _ref: payload.eventId },
      user: { _type: 'reference', _ref: payload.uploaderUserId },
      title: payload.abstract.title,
      authors: authorIds.map((authorId) => ({
        _ref: authorId,
        _type: 'reference',
      })),
      subjectArea: { _type: 'reference', _ref: payload.abstract.subjectAreaId },
      keywords: payload.abstract.keywords,
      format: payload.abstract.format,
      pdfFile: {
        _type: 'file',
        url: fileUploaded.url,
        asset: { _type: 'reference', _ref: fileUploaded._id },
      },
      status: 'submitted',
    });

    // Commit the transaction
    const result = await abstractTransaction
      .commit({ autoGenerateArrayKeys: true })
      .catch((error) => {
        // If error with abstract, delete all the authors created before
        authorIds.forEach((authorId) => {
          this.connector.delete(authorId);
        });
        throw new Error(
          'Transaction failed when creating new abstract: ' + error.message
        );
      });

    return this.getById(result.documentIds[0]);
  }

  public async updateAbstractReview(
    body: Pick<Abstract, '_id' | 'review' | 'status'>
  ): Promise<Abstract> {
    const connector = this.connectorService.connector as SanityClient;
    await connector
      .patch(body._id)
      .set({ status: body.status, review: body.review })
      .commit();
    return this.getById(body._id);
  }

  public async updateAbstractLinkAndFlashPoster(
    payload: SubmittedAbstractRevisionPayload
  ) {
    // throw new Error('Method not implemented!');

    const patch = {};

    if (!!payload.pdfFile) {
      const fileUploaded = await this.uploadAbstractFile(payload.pdfFile);
      if (!fileUploaded) {
        throw new Error('Transaction failed when uploading the abstract file.');
      }

      patch['pdfFile'] = {
        _type: 'file',
        url: fileUploaded.url,
        asset: { _type: 'reference', _ref: fileUploaded._id },
      };
    }

    if (!!payload.posterUrl) {
      patch['posterUrl'] = payload.posterUrl;
    }

    const connector = this.connectorService.connector as SanityClient;
    await connector.patch(payload._id).set(patch).commit();

    return this.getById(payload._id);
  }

  private async generateIdentifier() {
    // Fetch count of existing abstracts to generate an ID
    const abstractCount = await this.connector.fetch(
      `count(*[_type == 'abstract'])`,
      {}
    );
    return `${abstractCount + 1}`;
  }

  private mapResponse(abstract: any): Abstract {
    return {
      ...abstract,
      fileUrl: abstract.pdfFile?.url ?? '',
      format: (abstract.format as string)
        .replaceAll('oralPresentation', 'Oral Presentation')
        .replaceAll('flashPoster', 'Flash Poster'),
      keywords: (abstract.keywords as string)
        .replaceAll('; ', ',')
        .replaceAll('/', ',')
        .replaceAll(';', ',')
        .replaceAll(' , ', ',')
        .replaceAll(', ', ',')
        .replaceAll(' ,', ',')
        .split(','),
    };
  }

  private async uploadAbstractFile(file: File) {
    // Upload the file from the file system to Sanity assets
    const readStream = fs.createReadStream(
      `./files/${file['filename']}`
    ) as unknown as ReadableStream;
    return await this.connector.assets.upload('file', readStream, {
      filename: file['originalname'],
    });
  }
}
