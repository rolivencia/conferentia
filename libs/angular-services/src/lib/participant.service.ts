import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFrontendEnvironmentConfig, IParticipant } from '@conferentia/models';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService extends HttpService {
  constructor(
    protected override http: HttpClient,
    @Inject('env') protected override env: IFrontendEnvironmentConfig
  ) {
    super(http, env, 'participant');
  }

  public getByEventId(eventId: number | string): Observable<IParticipant[]> {
    return this.http.get<IParticipant[]>(`${this.prefix}/${eventId}`);
  }
}
