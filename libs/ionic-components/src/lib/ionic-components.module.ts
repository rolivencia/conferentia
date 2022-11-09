import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { SubjectAreaComponent } from './subject-area/subject-area.component';
import { IonicModule } from '@ionic/angular';
import { FillableContentPageComponent } from './fillable-content-page/fillable-content-page.component';
import { ParticipantCardComponent } from './participant-card/participant-card.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    ActivityCardComponent,
    FillableContentPageComponent,
    ParticipantCardComponent,
    SubjectAreaComponent,
  ],
  exports: [
    ActivityCardComponent,
    FillableContentPageComponent,
    ParticipantCardComponent,
    SubjectAreaComponent,
  ],
})
export class IonicComponentsModule {}
