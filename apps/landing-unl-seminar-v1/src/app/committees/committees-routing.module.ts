// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CommitteesPage } from './committees.page';

// Services
import { CommitteeService } from '@conferentia/angular-services';

const routes: Routes = [
  {
    path: '',
    component: CommitteesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CommitteeService],
})
export class CommitteesPageRoutingModule {}
