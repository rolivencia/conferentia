// Models
import { ConferentiaRoute } from '@conferentia/models';

export const appRoutes: ConferentiaRoute[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    data: {
      title: 'Home',
      url: 'home',
      icon: 'home',
    },
  },
  {
    path: 'general-information',
    loadChildren: () =>
      import('./general-information/general-information.module').then(
        (m) => m.GeneralInformationPageModule
      ),
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
    data: {
      title: 'Abstract Submission',
      url: 'abstract-submission',
      icon: 'newspaper',
    },
  },
  {
    path: 'keynote-speakers',
    loadChildren: () =>
      import('./keynote-speakers/keynote-speakers.module').then(
        (m) => m.KeynoteSpeakersPageModule
      ),
    data: {
      title: 'Keynote Speakers',
      url: 'keynote-speakers',
      icon: 'school',
    },
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.SchedulePageModule),
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
    data: { title: 'Committees', url: 'committees', icon: 'people' },
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
    data: { title: 'Registration', url: 'registration', icon: 'id-card' },
  },
  {
    path: 'travel-information',
    loadChildren: () =>
      import('./travel-information/travel-information.module').then(
        (m) => m.TravelInformationPageModule
      ),
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
    data: {
      title: 'Contact',
      url: 'contact',
      icon: 'mail',
    },
  },
];
