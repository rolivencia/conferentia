import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbstractReviewPage } from './abstract-review.page';

const routes: Routes = [
  {
    path: '',
    component: AbstractReviewPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbstractReviewPageRoutingModule {}
