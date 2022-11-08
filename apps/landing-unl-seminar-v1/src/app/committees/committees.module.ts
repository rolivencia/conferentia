import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommitteesPageRoutingModule } from './committees-routing.module';

import { CommitteesPage } from './committees.page';
import { IonicComponentsModule } from "@conferentia/ionic-components";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommitteesPageRoutingModule,
    IonicComponentsModule
  ],
  declarations: [CommitteesPage],
})
export class CommitteesPageModule {}
