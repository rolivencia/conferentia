import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { first, Observable, of, switchMap, tap } from 'rxjs';
import { Abstract } from '@conferentia/models';
import { statusesList } from '../_providers/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractService } from '@conferentia/angular-services';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'conferentia-submit-abstract-revision',
  templateUrl: './submit-abstract-revision.page.html',
  styleUrls: ['./submit-abstract-revision.page.scss'],
})
export class SubmitAbstractRevisionPage implements OnInit {
  public abstract$: Observable<Abstract | null> = of(null);

  public submitted = false;
  public statuses = statusesList;

  public form: FormGroup | undefined;

  constructor(
    private abstractService: AbstractService,
    private formBuilder: FormBuilder,
    private injector: EnvironmentInjector,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.abstract$ = this.route.queryParams.pipe(
      first(),
      switchMap((params) => this.abstractService.getById(params['abstractId'])),
      tap((abstract) => this.load(abstract))
    );
  }

  onDownloadClicked(href: string) {
    window.open(href, '_blank');
  }

  onSaveClicked() {
    this.submitted = true;
    this.abstractService.review(this.form?.value).subscribe({
      next: (abstract) => {
        this.injector.runInContext(() => {
          updateAlert();
          this.submitted = false;
        });
      },
      error: (error) => {
        this.injector.runInContext(() => {
          updateAlert(true);
          this.submitted = false;
        });
      },
    });
  }

  private load(abstract: Abstract) {
    this.form = this.formBuilder.group({
      _id: [abstract._id, Validators.required],
      review: [abstract.review ?? '', Validators.required],
      status: [abstract.status, Validators.required],
    });
  }
}

async function updateAlert(error = false) {
  const alert = await inject(AlertController).create({
    header: error ? 'Error' : 'Success',
    cssClass: error ? 'error-alert' : 'success-alert',
    message: error
      ? 'There was a problem updating the Abstract review. Please try again'
      : 'The abstract review updated successfully!',
    buttons: ['Dismiss'],
  });

  await alert.present();
}
