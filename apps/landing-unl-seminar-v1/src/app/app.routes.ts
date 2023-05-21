// Core
import { of } from 'rxjs';

// Guards
import { finishedRegistrationGuard } from '@conferentia/angular-services';

// Models
import { ConferentiaRoute } from '@conferentia/models';
import { ROUTE_TREE } from '@conferentia/ionic-pages';

// Services
import { adminDashboardGuard } from '../../../../libs/angular-services/src/lib/guards/admin-dashboard.guard';

export const APP_ROUTE_TREE = {
  HOME: 'home',
  ABSTRACT_REVIEW: 'abstract-review',
  PROCEEDINGS: 'assets/files/FAWHC 2023 - Workshop Proceedings.pdf',
  REGISTRATION: 'registration',
  SUBMIT_ABSTRACT_REVISION: 'submit-abstract-revision',
  SCHEDULE: 'schedule',
};

export const appRoutes: ConferentiaRoute[] = [
  {
    path: '',
    redirectTo: APP_ROUTE_TREE.HOME,
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
    path: APP_ROUTE_TREE.PROCEEDINGS,
    data: {
      title: 'Proceedings',
      url: APP_ROUTE_TREE.PROCEEDINGS,
      icon: 'book',
      type: 'external',
      action: () => window.open(APP_ROUTE_TREE.PROCEEDINGS, '_blank'),
    }
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
    path: APP_ROUTE_TREE.SCHEDULE,
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.SchedulePageModule),
    canLoad: [finishedRegistrationGuard],
    data: {
      title: 'Programme',
      url: APP_ROUTE_TREE.SCHEDULE,
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
    path: APP_ROUTE_TREE.REGISTRATION,
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
    data: {
      title: 'Registration',
      url: APP_ROUTE_TREE.REGISTRATION,
      icon: 'id-card',
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
      render: adminDashboardGuard,
    },
  },
  {
    path: APP_ROUTE_TREE.ABSTRACT_REVIEW,
    loadChildren: () =>
      import('./abstract-review/abstract-review.module').then(
        (m) => m.AbstractReviewPageModule
      ),
    canLoad: [adminDashboardGuard],
    data: {
      title: 'Abstract Review',
      url: APP_ROUTE_TREE.ABSTRACT_REVIEW,
      icon: 'bar-chart',
      render: () => of(false),
    },
  },
  {
    path: APP_ROUTE_TREE.SUBMIT_ABSTRACT_REVISION,
    loadChildren: () =>
      import('./submit-abstract-revision/submit-abstract-revision.module').then(
        (m) => m.SubmitAbstractRevisionPageModule
      ),
    canLoad: [finishedRegistrationGuard],
    data: {
      title: 'Submit Abstract Revision',
      url: APP_ROUTE_TREE.SUBMIT_ABSTRACT_REVISION,
      icon: 'bar-chart',
      render: () => of(false),
    },
  },
];
