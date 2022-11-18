import { Inject, Injectable } from '@angular/core';
import { IActivity, IEvent, IFrontendEnvironmentConfig } from "@conferentia/models";
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService extends HttpService {
  constructor(
    protected override http: HttpClient,
    @Inject('env') protected override env: IFrontendEnvironmentConfig
  ) {
    super(http, env, 'activity');
  }

  public getByEventId(eventId: number | string): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(`${this.prefix}/${eventId}`);
  }
}
