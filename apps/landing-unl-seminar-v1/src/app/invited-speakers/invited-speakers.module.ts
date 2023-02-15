import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeynoteSpeakersPageRoutingModule } from './invited-speakers-routing.module';

import { InvitedSpeakersPage } from './invited-speakers.page';
import { IonicComponentsModule } from "@conferentia/ionic-components";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KeynoteSpeakersPageRoutingModule,
    IonicComponentsModule
  ],
  declarations: [InvitedSpeakersPage],
})
export class InvitedSpeakersPageModule {}
