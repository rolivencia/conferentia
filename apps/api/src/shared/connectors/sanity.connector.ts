import { Injectable } from '@nestjs/common';
import sanityClient from '@sanity/client';
import { ConfigService } from '@nestjs/config';
import { ConnectorService } from './connector.service';

@Injectable()
export class SanityConnector extends ConnectorService {
  constructor(protected config: ConfigService) {
    super(config);
    this._connector = sanityClient({
      projectId: this.config.get<string>('SANITY_PROJECT_ID'),
      dataset: this.config.get<string>('SANITY_DATASET'),
      apiVersion: '2022-02-01',
      useCdn: true,
      // token: process.env.SANITY_TOKEN,
    });
  }
}
