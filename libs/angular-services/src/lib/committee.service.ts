// Core
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaces
import {
  ICommitteeArea,
  IFrontendEnvironmentConfig,
} from '@conferentia/models';

// Services
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CommitteeService extends HttpService {
  constructor(
    protected override http: HttpClient,
    @Inject('env') protected override env: IFrontendEnvironmentConfig
  ) {
    super(http, env, 'committee');
  }

  public get(eventId: number | string): Observable<ICommitteeArea[]> {
    return this.http.get<ICommitteeArea[]>(`${this.prefix}/${eventId}`);
  }
}
