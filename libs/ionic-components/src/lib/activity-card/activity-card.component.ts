import { Component, inject, Input, OnInit } from '@angular/core';
import { IActivity } from '@conferentia/models';
import { map, tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'conferentia-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent implements OnInit {
  @Input() activity!: IActivity;

  sanitizedActivity!: IActivity;

  private sanitizer: DomSanitizer = inject(DomSanitizer);

  constructor() {}

  ngOnInit(): void {
    this.sanitizedActivity = {
      ...this.activity,
      abstracts: !this.activity.abstracts
        ? []
        : this.activity.abstracts.map((abstract) => ({
            ...abstract,
            posterUrl: abstract.posterUrl
              ? this.sanitizer.bypassSecurityTrustResourceUrl(
                  abstract.posterUrl as string
                )
              : undefined,
          })),
    };
  }
}
