import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallForPapersPageRoutingModule } from './call-for-papers-routing.module';

import { CallForPapersPage } from './call-for-papers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallForPapersPageRoutingModule,
  ],
  declarations: [CallForPapersPage],
})
export class CallForPapersPageModule {}
