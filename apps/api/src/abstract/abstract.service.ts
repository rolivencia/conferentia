import { Injectable } from '@nestjs/common';
import { ConnectorService } from '../shared/connectors/connector.service';
import { SanityClient } from '@sanity/client';
import { Abstract, SubmittedAbstractPayload } from '@conferentia/models';
import * as fs from 'fs';

@Injectable()
export class AbstractService {
  // ToDo: Check on how to programatically asign the typing to the connector (RO - 2022/12/05 - #105)
  private connector: SanityClient;

  constructor(private connectorService: ConnectorService) {
    this.connector = this.connectorService.connector as SanityClient;
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
                        keywords,
                        status,
                        format,
                        subjectArea->,
                        authors[]->,
                        pdfFile{ url }
                  }
                  `;

    const result: any[] = await this.connector.fetch(query, {});
    return result.map((abstract) => {
      const { pdfFile, ...data } = abstract;
      return { ...data, fileUrl: pdfFile.url };
    });
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
                        keywords,
                        status,
                        format,
                        subjectArea->,
                        authors[]->,
                        pdfFile{ url }
                  }
                  `;

    const { pdfFile, ...data } = await this.connector.fetch(query, {});
    return { ...data, fileUrl: pdfFile.url };
  }

  public async create(payload: SubmittedAbstractPayload) {
    // Upload the file from the file system to Sanity assets
    const readStream = fs.createReadStream(
      `./files/${payload.abstract.file['filename']}`
    ) as unknown as ReadableStream;
    const fileUploaded = await this.connector.assets.upload(
      'file',
      readStream,
      { filename: payload.abstract.file['originalname'] }
    );

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
}
