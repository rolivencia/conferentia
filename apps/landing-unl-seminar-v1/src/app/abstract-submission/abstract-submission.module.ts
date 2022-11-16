import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbstractSubmissionPageRoutingModule } from './abstract-submission-routing.module';

import { AbstractSubmissionPage } from './abstract-submission.page';
import { IonicComponentsModule } from "@conferentia/ionic-components";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbstractSubmissionPageRoutingModule,
    IonicComponentsModule
  ],
  declarations: [AbstractSubmissionPage],
})
export class AbstractSubmissionPageModule {}
