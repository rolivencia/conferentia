import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OralPresentationsPageRoutingModule } from './oral-presentations-routing.module';

import { OralPresentationsPage } from './oral-presentations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OralPresentationsPageRoutingModule,
  ],
  declarations: [OralPresentationsPage],
})
export class OralPresentationsPageModule {}
