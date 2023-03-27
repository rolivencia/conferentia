import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmitAbstractRevisionPageRoutingModule } from './submit-abstract-revision-routing.module';
import { IonicComponentsModule } from '@conferentia/ionic-components';
import { PipesModule } from '../_providers/pipes/pipes.module';

// Pages
import { SubmitAbstractRevisionPage } from './submit-abstract-revision.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitAbstractRevisionPageRoutingModule,
    IonicComponentsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  declarations: [SubmitAbstractRevisionPage],
})
export class SubmitAbstractRevisionPageModule {}
