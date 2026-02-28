import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { AuthAdapter } from './auth-adapter.interface';

/**
 * Auth0 implementation of the AuthAdapter interface.
 * Register in your app module as:
 *   { provide: AUTH_ADAPTER, useClass: Auth0AuthAdapter }
 */
@Injectable()
export class Auth0AuthAdapter implements AuthAdapter {
  isAuthenticated$: Observable<boolean>;

  constructor(private auth0Service: AuthService) {
    this.isAuthenticated$ = this.auth0Service.isAuthenticated$;
  }

  loginWithRedirect(): void {
    this.auth0Service.loginWithRedirect();
  }

  logout(): void {
    this.auth0Service.logout();
  }
}
