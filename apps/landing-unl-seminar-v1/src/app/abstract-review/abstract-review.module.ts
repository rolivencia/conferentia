import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbstractReviewPageRoutingModule } from './abstract-review-routing.module';

import { AbstractReviewPage } from './abstract-review.page';
import { IonicComponentsModule } from '@conferentia/ionic-components';

import { AuthorsPipe } from '../_providers/authors.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AbstractReviewPageRoutingModule,
    IonicComponentsModule,
  ],
  declarations: [AbstractReviewPage, AuthorsPipe],
})
export class AbstractReviewPageModule {}
