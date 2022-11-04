import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { SubjectAreaComponent } from './subject-area/subject-area.component';
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ActivityCardComponent, SubjectAreaComponent],
  exports: [
    ActivityCardComponent
  ]
})
export class IonicComponentsModule {}
