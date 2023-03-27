import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitAbstractRevisionPageRoutingModule } from './submit-abstract-revision-routing.module';

import { SubmitAbstractRevisionPage } from './submit-abstract-revision.page';
import { IonicComponentsModule } from '@conferentia/ionic-components';
import { AuthorsPipe } from '../_providers/authors.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitAbstractRevisionPageRoutingModule,
    IonicComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [SubmitAbstractRevisionPage, AuthorsPipe],
})
export class SubmitAbstractRevisionPageModule {}
