import { Component, inject, Input, OnInit } from '@angular/core';
import { Abstract, IActivity } from '@conferentia/models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/** View-model extending Abstract with a sanitized poster URL for iframe binding */
interface SanitizedAbstract extends Omit<Abstract, 'posterUrl'> {
  posterUrl?: SafeResourceUrl;
}

/** View-model extending IActivity with sanitized abstracts */
interface SanitizedActivity extends Omit<IActivity, 'abstracts'> {
  abstracts?: SanitizedAbstract[];
}

@Component({
  selector: 'conferentia-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent implements OnInit {
  @Input() activity!: IActivity;

  sanitizedActivity!: SanitizedActivity;

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
                  abstract.posterUrl
                )
              : undefined,
          })),
    };
  }
}
