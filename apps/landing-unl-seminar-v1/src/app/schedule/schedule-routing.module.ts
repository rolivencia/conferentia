import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulePage } from './schedule.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./activity/activity.module').then((m) => m.ActivityPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulePageRoutingModule {}
