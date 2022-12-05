import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { UserService } from '@conferentia/angular-services';
import { inject } from '@angular/core';
import { ROUTE_TREE } from '@conferentia/ionic-pages';
import { AuthService } from '@auth0/auth0-angular';

/**
 * This guard checks if a given logged-in user has finished they registration.
 * If they're logged in but haven't finished their registration, they're sent back
 * again and again to the User Profile page.
 */
export const finishedRegistrationGuard = (): Observable<boolean | UrlTree> => {
  const auth0Service = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  return combineLatest([
    auth0Service.isAuthenticated$,
    userService.currentUser$,
  ]).pipe(
    switchMap(([isAuthenticated, currentUser]) => {
      if (!isAuthenticated) {
        return of(true);
      }

      return currentUser?.hasFinishedRegistration
        ? of(true)
        : of(router.parseUrl(ROUTE_TREE.USER_PROFILE));
    })
  );
};
