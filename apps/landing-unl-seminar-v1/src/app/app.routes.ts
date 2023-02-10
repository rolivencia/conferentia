// Core
import { inject } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

// Guards
import {
  finishedRegistrationGuard,
} from '@conferentia/angular-services';

// Models
import { ConferentiaRoute } from '@conferentia/models';
import { ROUTE_TREE } from '@conferentia/ionic-pages';

// Services
import { AuthService } from '@auth0/auth0-angular';
import { adminDashboardGuard } from "../../../../libs/angular-services/src/lib/guards/admin-dashboard.guard";

export const appRoutes: ConferentiaRoute[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: ROUTE_TREE.HOME,
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canLoad: [finishedRegistrationGuard],
    data: {
      title: 'Home',
      url: ROUTE_TREE.HOME,
      icon: 'home',
    },
  },
  {
    path: 'general-information',
    loadChildren: () =>
      import('./general-information/general-information.module').then(
        (m) => m.GeneralInformationPageModule
      ),
    canLoad: [finishedRegistrationGuard],
    data: {
      title: 'General Information',
      url: 'general-information',
      icon: 'information-circle',
    },
  },
  {
    path: 'abstract-submission',
    loadChildren: () =>
      import('./abstract-submission/abstract-submission.module').then(
        (m) => m.AbstractSubmissionPageModule
      ),
    canLoad: [finishedRegistrationGuard],
    data: {
      title: 'Abstract Submission',
      url: 'abstract-submission',
      icon: 'newspaper',
    },
  },
  {
    path: 'invited-speakers',
    loadChildren: () =>
      import('./invited-speakers/invited-speakers.module').then(
        (m) => m.InvitedSpeakersPageModule
      ),
    canLoad: [finishedRegistrationGuard],
    data: {
      title: 'Invited Speakers',
      url: 'invited-speakers',
      icon: 'school',
    },
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.SchedulePageModule),
    canLoad: [finishedRegistrationGuard],
    data: {
      title: 'Programme',
      url: 'schedule',
      icon: 'calendar',
    },
  },
  {
    path: 'committees',
    loadChildren: () =>
      import('./committees/committees.module').then(
        (m) => m.CommitteesPageModule
      ),
    canLoad: [finishedRegistrationGuard],
    data: { title: 'Committees', url: 'committees', icon: 'people' },
  },
  {
    path: 'registration',
    data: {
      title: 'Registration',
      url: 'registration',
      icon: 'id-card',
      action: (): void => {
        const authService = inject(AuthService);
        authService.loginWithRedirect();
      },
      render: (): Observable<boolean> => {
        const authService = inject(AuthService);
        return authService.isAuthenticated$.pipe(
          switchMap((result) => of(!result))
        );
      },
      type: 'external',
    },
  },
  {
    path: 'travel-information',
    loadChildren: () =>
      import('./travel-information/travel-information.module').then(
        (m) => m.TravelInformationPageModule
      ),
    canLoad: [finishedRegistrationGuard],
    data: {
      title: 'Travel Information',
      url: 'travel-information',
      icon: 'airplane',
    },
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactPageModule),
    canLoad: [finishedRegistrationGuard],
    data: {
      title: 'Contact',
      url: 'contact',
      icon: 'mail',
    },
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardPageModule
      ),
    canLoad: [adminDashboardGuard],
    data: {
      title: 'Abstracts Review Dashboard',
      url: 'admin-dashboard',
      icon: 'bar-chart',
      render: adminDashboardGuard
    },
  },
];
