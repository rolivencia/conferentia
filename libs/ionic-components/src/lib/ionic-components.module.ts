import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { SubjectAreaComponent } from './subject-area/subject-area.component';
import { IonicModule } from '@ionic/angular';
import { FillableContentPageComponent } from './fillable-content-page/fillable-content-page.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    ActivityCardComponent,
    FillableContentPageComponent,
    SubjectAreaComponent,
  ],
  exports: [
    ActivityCardComponent,
    FillableContentPageComponent,
    SubjectAreaComponent,
  ],
})
export class IonicComponentsModule {}
