import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallForPapersPage } from './call-for-papers.page';

const routes: Routes = [
  {
    path: '',
    component: CallForPapersPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallForPapersPageRoutingModule {}
