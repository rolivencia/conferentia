import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelInformationPage } from './travel-information.page';

const routes: Routes = [
  {
    path: '',
    component: TravelInformationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelInformationPageRoutingModule {}
