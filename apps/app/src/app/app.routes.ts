// TODO: Remove redundancy between the appPages property and the titles defined for routes  (2022/11/04 - RO - #43)
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
      title: 'Inicio',
      url: '/home',
      icon: 'home',
    },
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
    data: {
      title: 'Acreditación',
      url: '/registration',
      icon: 'qr-code',
    },
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.SchedulePageModule),
    data: {
      title: 'Cronograma',
      url: '/schedule',
      icon: 'calendar',
    },
  },
  {
    path: 'participants',
    loadChildren: () =>
      import('./participants/participants.module').then(
        (m) => m.ParticipantsPageModule
      ),
    data: {
      title: 'Disertantes',
      url: '/participants',
      icon: 'people',
    },
  },
  {
    path: 'sponsors',
    loadChildren: () =>
      import('./sponsors/sponsors.module').then((m) => m.SponsorsPageModule),
    data: {
      title: 'Patrocinadores',
      url: '/sponsors',
      icon: 'storefront',
    },
  },
];
