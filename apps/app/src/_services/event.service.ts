import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

// Models
import { IEvent } from '@conferentia/models';

// Services
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class EventService extends HttpService {
  get currentEvent$(): BehaviorSubject<IEvent | null> {
    return this._currentEvent$;
  }
  protected prefix = `${environment.apiUrl}/event`;

  private _currentEvent$: BehaviorSubject<IEvent | null> =
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
        this._currentEvent$.next(event);
        return of(event);
      })
    );
  }
}
