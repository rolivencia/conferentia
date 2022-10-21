import { HttpClient } from '@angular/common/http';

export abstract class HttpService {
  protected abstract prefix: string;

  constructor(protected http: HttpClient) {}
}
