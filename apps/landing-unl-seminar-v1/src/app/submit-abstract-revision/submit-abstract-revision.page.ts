import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { first, Observable, of, switchMap, tap, throwError } from 'rxjs';
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

  public form!: FormGroup;

  private fileData: File | undefined;

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

  public processUploadedAbstractFile(fileInput: any) {
    const fileData = fileInput.target.files[0];
    if (fileData) {
      this.fileData = fileData;
    }
  }

  onDownloadClicked(href: string) {
    window.open(href, '_blank');
  }

  private uploadFile(fileData: File): Observable<any> {
    if (fileData.size > 2048000 || fileData.type !== 'application/pdf') {
      this.injector.runInContext(() => {
        errorInFileUploadAlert();
      });
      return throwError('Incompatible file.');
    }

    this.submitted = true;

    return this.abstractService.uploadAbstractFile(fileData).pipe(
      switchMap((uploadedFileData) => {
        const { _id, posterUrl } = this.form.value;
        return this.abstractService.sendRevision({
          _id,
          posterUrl,
          pdfFile: uploadedFileData,
        });
      })
    );
  }

  private uploadPosterUrl(): Observable<any> {
    const { _id, posterUrl } = this.form.value;
    return this.abstractService.sendRevision({
      _id,
      posterUrl,
    });
  }

  onSaveClicked() {
    const actionObservable = this.fileData
      ? this.uploadFile(this.fileData)
      : this.uploadPosterUrl();

    actionObservable.subscribe({
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
      pdfFile: [''],
      // posterUrl: [abstract.posterUrl, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      posterUrl: [abstract.posterUrl],
    });
  }
}

async function updateAlert(error = false) {
  const alert = await inject(AlertController).create({
    header: error ? 'Error' : 'Success',
    cssClass: error ? 'error-alert' : 'success-alert',
    message: error
      ? 'There was a problem updating the Abstract revision. Please try again'
      : 'The abstract revision updated successfully!',
    buttons: ['Dismiss'],
  });

  await alert.present();
}
async function errorInFileUploadAlert() {
  const alert = await inject(AlertController).create({
    header: 'Error',
    cssClass: 'error-alert',
    message:
      'File must have a maximum size of 2MB and must be in PDF format. Please upload a new file.',
    buttons: ['Dismiss'],
  });

  await alert.present();
}
