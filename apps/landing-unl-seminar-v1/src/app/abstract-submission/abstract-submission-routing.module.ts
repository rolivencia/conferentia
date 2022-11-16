import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbstractSubmissionPage } from './abstract-submission.page';

const routes: Routes = [
  {
    path: '',
    component: AbstractSubmissionPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbstractSubmissionPageRoutingModule {}
