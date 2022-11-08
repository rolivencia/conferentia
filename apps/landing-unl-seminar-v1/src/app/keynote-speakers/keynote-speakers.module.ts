import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeynoteSpeakersPageRoutingModule } from './keynote-speakers-routing.module';

import { KeynoteSpeakersPage } from './keynote-speakers.page';
import { IonicComponentsModule } from "@conferentia/ionic-components";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KeynoteSpeakersPageRoutingModule,
    IonicComponentsModule
  ],
  declarations: [KeynoteSpeakersPage],
})
export class KeynoteSpeakersPageModule {}
