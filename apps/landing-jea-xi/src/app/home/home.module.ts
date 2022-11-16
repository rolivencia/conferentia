import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { IonicComponentsModule } from "@conferentia/ionic-components";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, IonicComponentsModule],
  declarations: [HomePage],
})
export class HomePageModule {}
