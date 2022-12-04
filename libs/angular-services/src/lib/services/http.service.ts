// Core
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';

// Environment
import { IFrontendEnvironmentConfig } from '@conferentia/models';

export abstract class HttpService {
  // Hosts the URL resource to which a class extending HttpService accesses to send and retrieve data
  protected prefix: string;

  constructor(
    protected http: HttpClient,
    @Inject('env') protected env: IFrontendEnvironmentConfig,
    private resource: string
  ) {
    this.prefix = `${env.apiUrl}/${resource}`;
  }
}
