import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent } from '@conferentia/models';
import { environment } from '../environments/environment';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventService extends HttpService {
  protected prefix = `${environment.apiUrl}/event`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public get(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.prefix}/${id}`);
  }
}
