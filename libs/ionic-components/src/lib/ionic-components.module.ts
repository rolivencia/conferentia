import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { SubjectAreaComponent } from './subject-area/subject-area.component';
import { IonicModule } from '@ionic/angular';
import { FillableContentPageComponent } from './fillable-content-page/fillable-content-page.component';
import { ParticipantCardComponent } from './participant-card/participant-card.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from "../../../../apps/landing-unl-seminar-v1/src/app/_providers/pipes/pipes.module";

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule, PipesModule],
  declarations: [
    ActivityCardComponent,
    FillableContentPageComponent,
    ParticipantCardComponent,
    SubjectAreaComponent,
    ScheduleComponent,
    NavigationMenuComponent,
  ],
  exports: [
    ActivityCardComponent,
    FillableContentPageComponent,
    ParticipantCardComponent,
    SubjectAreaComponent,
    ScheduleComponent,
    NavigationMenuComponent,
  ],
})
export class IonicComponentsModule {}
