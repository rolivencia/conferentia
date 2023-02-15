import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { UserService } from '@conferentia/angular-services';
import { inject } from '@angular/core';
import { ROUTE_TREE } from '@conferentia/ionic-pages';
import { AuthService } from '@auth0/auth0-angular';
import { EUserRole } from "../../../../models/src/lib/user.interface";

/**
 * This guard checks if a given logged-in user has the Administrator or Reviewer roles
 */
export const adminDashboardGuard = (): Observable<boolean> => {
  const authService = inject(UserService);
  return authService.currentUser$.pipe(
    switchMap((user) =>
      of(
        ([EUserRole.ADMINISTRATOR, EUserRole.REVIEWER] as string[]).includes(
          user?.role.key ?? ''
        )
      )
    )
  );
};
