import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitedSpeakersPage } from './invited-speakers.page';

const routes: Routes = [
  {
    path: '',
    component: InvitedSpeakersPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeynoteSpeakersPageRoutingModule {}
