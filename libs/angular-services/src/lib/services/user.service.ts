import { Inject, Injectable } from '@angular/core';
import { AuthService, User as AuthUser } from '@auth0/auth0-angular';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { IFrontendEnvironmentConfig, User } from '@conferentia/models';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService {
  public currentUser$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(
    private auth0Service: AuthService,
    protected override http: HttpClient,
    @Inject('env') protected override env: IFrontendEnvironmentConfig
  ) {
    super(http, env, 'user');
    // @ts-ignore
    const user  = JSON.parse(localStorage.getItem('currentUser')) ?? null;
    this.currentUser$ = new BehaviorSubject<User | null>(user);
  }

  public authenticateAgainstDatabase(
    user: AuthUser | null | undefined
  ): Observable<User | null> {
    return this.http.post<User>(`${this.prefix}`, user).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser$.next(user);
        return user;
      })
    );
  }

  public login(): Observable<User | null> {
    return this.auth0Service.user$.pipe(
      switchMap((user: AuthUser | null | undefined) => {
        if (!user) {
          return of(null);
        }

        return this.authenticateAgainstDatabase(user);
      })
    );
  }
}
