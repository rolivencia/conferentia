import { Observable, of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { EUserRole } from '@conferentia/models';
import { UserService } from '../services/user.service';

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
