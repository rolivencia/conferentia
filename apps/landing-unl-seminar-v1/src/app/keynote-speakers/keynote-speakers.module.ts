import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeynoteSpeakersPageRoutingModule } from './keynote-speakers-routing.module';

import { KeynoteSpeakersPage } from './keynote-speakers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KeynoteSpeakersPageRoutingModule,
  ],
  declarations: [KeynoteSpeakersPage],
})
export class KeynoteSpeakersPageModule {}
