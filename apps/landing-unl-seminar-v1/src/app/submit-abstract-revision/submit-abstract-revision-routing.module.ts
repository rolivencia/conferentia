import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitAbstractRevisionPage } from './submit-abstract-revision.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitAbstractRevisionPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitAbstractRevisionPageRoutingModule {}
