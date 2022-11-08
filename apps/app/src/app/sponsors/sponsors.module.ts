import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SponsorsPageRoutingModule } from './sponsors-routing.module';

import { SponsorsPage } from './sponsors.page';
import { IonicComponentsModule } from "@conferentia/ionic-components";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SponsorsPageRoutingModule, IonicComponentsModule],
  declarations: [SponsorsPage],
})
export class SponsorsPageModule {}
