import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelInformationPageRoutingModule } from './travel-information-routing.module';

import { TravelInformationPage } from './travel-information.page';
import { IonicComponentsModule } from "@conferentia/ionic-components";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelInformationPageRoutingModule,
    IonicComponentsModule
  ],
  declarations: [TravelInformationPage],
})
export class TravelInformationPageModule {}