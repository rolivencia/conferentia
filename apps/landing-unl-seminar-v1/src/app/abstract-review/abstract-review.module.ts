import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbstractReviewPageRoutingModule } from './abstract-review-routing.module';

import { AbstractReviewPage } from './abstract-review.page';
import { IonicComponentsModule } from '@conferentia/ionic-components';
import { PipesModule } from '@conferentia/ionic-components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AbstractReviewPageRoutingModule,
    IonicComponentsModule,
    PipesModule
  ],
  declarations: [AbstractReviewPage],
})
export class AbstractReviewPageModule {}
