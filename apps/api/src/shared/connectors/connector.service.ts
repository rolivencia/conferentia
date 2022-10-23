import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export abstract class ConnectorService {
  get connector(): any {
    return this._connector;
  }

  protected _connector: any;

  constructor(protected config: ConfigService) {}
}
