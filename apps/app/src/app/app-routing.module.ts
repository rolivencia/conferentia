import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// TODO: Remove redundancy between the appPages property and the titles defined for routes  (2022/11/04 - RO - #43)
const routes: Routes = [
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
      title: 'Inicio'
    }
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
    data: {
      title: 'Acreditación'
    }
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.SchedulePageModule),
    data: {
      title: 'Cronograma'
    }
  },
  {
    path: 'participants',
    loadChildren: () =>
      import('./participants/participants.module').then(
        (m) => m.ParticipantsPageModule
      ),
    data: {
      title: 'Disertantes'
    }
  },
  {
    path: 'sponsors',
    loadChildren: () =>
      import('./sponsors/sponsors.module').then(
        (m) => m.SponsorsPageModule
      ),
    data: {
      title: 'Patrocinadores'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
