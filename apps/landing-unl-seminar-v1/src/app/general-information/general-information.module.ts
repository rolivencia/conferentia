import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralInformationPageRoutingModule } from './general-information-routing.module';

import { GeneralInformationPage } from './general-information.page';
import { IonicComponentsModule } from "@conferentia/ionic-components";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralInformationPageRoutingModule,
    IonicComponentsModule
  ],
  declarations: [GeneralInformationPage],
})
export class GeneralInformationPageModule {}
