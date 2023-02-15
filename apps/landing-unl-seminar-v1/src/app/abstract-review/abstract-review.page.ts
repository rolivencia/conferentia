import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Abstract } from '@conferentia/models';
import { AbstractService } from '@conferentia/angular-services';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

@Component({
  selector: 'conferentia-abstract-review',
  templateUrl: './abstract-review.page.html',
  styleUrls: ['./abstract-review.page.scss'],
})
export class AbstractReviewPage implements OnInit {
  public abstract$: Observable<Abstract | null> = of(null);

  public statuses = [
    { title: 'Submitted', value: 'submitted' },
    { title: 'In Evaluation', value: 'inEvaluation' },
    {
      title: 'Accepted With Modifications',
      value: 'acceptedWithModifications',
    },
    { title: 'Accepted', value: 'accepted' },
    { title: 'Rejected', value: 'rejected' },
    {
      title: 'Assigned modality: Oral presentation',
      value: 'Assigned modality: Oral presentation',
    },
    {
      title: 'Assigned modality: Flash poster',
      value: 'Assigned modality: Flash poster',
    },
  ];

  constructor(
    private abstractService: AbstractService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.abstract$ = this.route.queryParams.pipe(
      switchMap((params) => this.abstractService.getById(params['abstractId']))
    );

    this.abstract$.subscribe((x) => {
      console.log(x);
    });
  }

  onDownloadClicked(href: string) {
    window.open(href, '_blank');
  }
}
