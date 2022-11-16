import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from './schedule-routing.module';

import { SchedulePage } from './schedule.page';
import { IonicComponentsModule } from "@conferentia/ionic-components";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SchedulePageRoutingModule, IonicComponentsModule],
  declarations: [SchedulePage],
})
export class SchedulePageModule {}
