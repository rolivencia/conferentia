import { Inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Abstract, IFrontendEnvironmentConfig } from '@conferentia/models';
import { Observable } from 'rxjs';

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
    return this.http.get<Abstract[]>(`${this.prefix}/user/${userId}`);
  }

  public getByEventId(eventId: string): Observable<Abstract[]> {
    return this.http.get<Abstract[]>(`${this.prefix}/event/${eventId}`);
  }

  public create(payload: any): Observable<Abstract> {
    return this.http.post<any>(`${this.prefix}`, payload);
  }

  public uploadAbstractFile(fileData: File): Observable<File> {
    const formData = new FormData();
    formData.append('uploaded-abstract', fileData);
    return this.http.post<File>(`${this.prefix}/upload`, formData);
  }
}
