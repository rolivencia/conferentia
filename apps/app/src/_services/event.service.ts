import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { IEvent } from '@conferentia/models';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService extends HttpService {
  protected prefix = `${environment.apiUrl}/event`;

  private currentEvent$: BehaviorSubject<IEvent | null> =
    new BehaviorSubject<IEvent | null>(null);

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public get(id: number | string): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.prefix}/${id}`);
  }

  // Used to set the current event at app boostrapping by
  // reading the app environment.ts file
  // TODO: Load event data based on SaaS-oriented configuration (2022/11/04 - RO - #40)
  public setFromEnvironment(): Observable<IEvent> {
    return this.get(environment.eventId).pipe(
      switchMap((event) => {
        this.currentEvent$.next(event);
        return of(event);
      })
    );
  }
}
