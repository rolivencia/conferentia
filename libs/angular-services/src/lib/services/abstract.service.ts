import { Inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Abstract, IFrontendEnvironmentConfig } from '@conferentia/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbstractService extends HttpService {
  constructor(
    protected override http: HttpClient,
    @Inject('env') protected override env: IFrontendEnvironmentConfig
  ) {
    super(http, env, 'abstract');
  }

  public getByUserId(userId: string): Observable<Abstract[]> {
    return of([]);
  }

  public create(): Observable<Abstract> {
    return of();
  }
}
