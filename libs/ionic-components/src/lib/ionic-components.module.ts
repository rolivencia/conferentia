import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { SubjectAreaComponent } from './subject-area/subject-area.component';
import { IonicModule } from '@ionic/angular';
import { FillableContentPageComponent } from './fillable-content-page/fillable-content-page.component';
import { ParticipantCardComponent } from './participant-card/participant-card.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    ActivityCardComponent,
    FillableContentPageComponent,
    ParticipantCardComponent,
    SubjectAreaComponent,
    ScheduleComponent,
  ],
  exports: [
    ActivityCardComponent,
    FillableContentPageComponent,
    ParticipantCardComponent,
    SubjectAreaComponent,
    ScheduleComponent
  ]
})
export class IonicComponentsModule {}
