import { Component, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ActivityService } from '@conferentia/angular-services';
import { ActivatedRoute } from '@angular/router';
import { IActivity } from '@conferentia/models';

@Component({
  selector: 'conferentia-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage {
  activity$!: Observable<IActivity>;

  private activityService: ActivityService = inject(ActivityService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activity$ = this.route.paramMap.pipe(
      switchMap((params) => this.activityService.getById(params.get('id')!))
    );
  }
}
