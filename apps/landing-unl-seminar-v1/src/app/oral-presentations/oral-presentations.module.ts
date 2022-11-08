import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OralPresentationsPageRoutingModule } from './oral-presentations-routing.module';

import { OralPresentationsPage } from './oral-presentations.page';
import { IonicComponentsModule } from "@conferentia/ionic-components";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OralPresentationsPageRoutingModule,
    IonicComponentsModule
  ],
  declarations: [OralPresentationsPage],
})
export class OralPresentationsPageModule {}
