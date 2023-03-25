import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitAbstractRevisionPageRoutingModule } from './submit-abstract-revision-routing.module';

import { SubmitAbstractRevisionPage } from './submit-abstract-revision.page';
import { IonicComponentsModule } from "@conferentia/ionic-components";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitAbstractRevisionPageRoutingModule,
    IonicComponentsModule
  ],
  declarations: [SubmitAbstractRevisionPage],
})
export class SubmitAbstractRevisionPageModule {}
