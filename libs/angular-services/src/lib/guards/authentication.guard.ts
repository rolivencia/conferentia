import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ROUTE_TREE } from '@conferentia/ionic-pages';

export const authenticationGuard = (): Observable<boolean | UrlTree> => {
  const auth0Service = inject(AuthService);
  const router = inject(Router);

  return auth0Service.isAuthenticated$.pipe(
    switchMap((result) => {
      return result ? of(true) : of(router.parseUrl(ROUTE_TREE.HOME));
    })
  );
};
