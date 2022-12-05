import { Injectable } from '@nestjs/common';
import { ConnectorService } from '../shared/connectors/connector.service';
import { SanityClient } from '@sanity/client';
import { Abstract } from '@conferentia/models';

@Injectable()
export class AbstractService {
  // ToDo: Check on how to programatically asign the typing to the connector (RO - 2022/12/05 - #105)
  private connector: SanityClient;

  constructor(private connectorService: ConnectorService) {
    this.connector = this.connectorService.connector as SanityClient;
  }

  public async getByEmail(email: string): Promise<Abstract[]> {
    return null;
  }

  public async create(abstract: Partial<Abstract>) {
    return null;
  }
}
