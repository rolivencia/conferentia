import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { IEvent, SubmittedAbstractPayload, User } from '@conferentia/models';
import {
  AbstractService,
  EventService,
  UserService,
} from '@conferentia/angular-services';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'conferentia-abstract-submission',
  templateUrl: './abstract-submission.page.html',
  styleUrls: ['./abstract-submission.page.scss'],
})
export class AbstractSubmissionPage implements OnInit {
  public currentEvent$: Observable<IEvent | null> = of(null);
  public currentUser$: Observable<User | null> = of(null);
  public form: FormGroup | undefined;
  public submitting: boolean = false;

  private fileData: File | undefined;

  constructor(
    private abstractService: AbstractService,
    private formBuilder: FormBuilder,
    private injector: EnvironmentInjector,
    private authService: AuthService
  ) {
    const eventService = inject(EventService);
    const userService = inject(UserService);
    this.currentEvent$ = eventService.currentEvent$.asObservable();
    this.currentUser$ = userService.currentUser$.asObservable();
  }

  ngOnInit() {
    this.buildForm();
    this.fillData();
  }

  get authorControls(): FormControl[] {
    return (this.form?.get('authors') as FormArray).controls as FormControl[];
  }

  public navigateToRegistration() {
    this.authService.loginWithRedirect();
  }

  public onSubmitAbstractButtonClicked() {
    if (!this.fileData) {
      return;
    }

    if (
      this.fileData.size > 2048000 ||
      this.fileData.type !== 'application/pdf'
    ) {
      this.injector.runInContext(() => {
        errorInFileUploadAlert();
      });
      return;
    }

    this.submitting = true;
    combineLatest([
      this.abstractService.uploadAbstractFile(this.fileData),
      this.currentUser$,
      this.currentEvent$,
    ])
      .pipe(
        switchMap(([uploadedFileData, user, event]) => {
          if (!uploadedFileData || !user || !event) {
            throw new Error(
              'An error occurred when fetching data to build the request.'
            );
          }

          const { file, ...data } = this.form?.value;
          const payload: SubmittedAbstractPayload = {
            abstract: {
              title: data.title,
              keywords: data.keywords,
              subjectAreaId: data.subjectAreaId,
              authors: data.authors,
              file: uploadedFileData,
              format: data.format,
            },
            eventId: event?._id,
            uploaderUserId: user?._id,
          };

          return this.abstractService.create(payload);
        })
      )
      .subscribe({
        next: (result) => {
          this.submitting = false;
          this.form?.reset();
          this.injector.runInContext(() => {
            successInSavingAbstract();
          });
        },
        error: (error) => {
          this.submitting = false;
          this.injector.runInContext(() => {
            errorInSavingAbstract();
          });
          console.error(error);
        },
      });
  }

  public onAddAuthorButtonClicked() {
    const authorsControl = this.form?.get('authors') as FormArray;
    authorsControl.push(this.addAuthor());
  }

  public onRemoveAuthorButtonClicked(i: number) {
    const authorsControl = this.form?.get('authors') as FormArray;
    if (authorsControl.length > 1) {
      authorsControl.removeAt(i);
    }
  }

  public processUploadedAbstractFile(fileInput: any) {
    const fileData = fileInput.target.files[0];
    if (fileData) {
      this.fileData = fileData;
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      authors: this.formBuilder.array([this.addAuthor()]),
      keywords: ['', Validators.required],
      subjectAreaId: ['', Validators.required],
      format: ['', Validators.required],
      file: [null, Validators.required],
    });
  }

  private addAuthor(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      institution: ['', Validators.required],
    });
  }

  // ToDo: Remove this test method
  private fillData() {
    if (this.form) {
      this.form.get('title')?.setValue('My Nice Abstract About Everything');
      this.form.get('keywords')?.setValue('about/everything/coding');
      this.form.get('format')?.setValue('flashPoster');
      this.form
        .get('subjectAreaId')
        ?.setValue('b6e4bb26-0df2-425f-9974-0740fb0ad60a');
      this.onAddAuthorButtonClicked();
      this.form.get('authors')?.setValue([
        {
          firstName: 'Ramiro',
          lastName: 'Olivencia',
          institution: 'UTN FRSF',
        },
        {
          firstName: 'Oscar',
          lastName: 'Olivencia',
          institution: 'LODELOABUELO',
        },
      ]);
    }
  }
}

async function errorInSavingAbstract() {
  const alert = await inject(AlertController).create({
    header: 'Error',
    cssClass: 'error-alert',
    message:
      'An error occurred when trying to submit your abstract. Please try again.',
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

async function successInSavingAbstract() {
  const alert = await inject(AlertController).create({
    header: 'Success',
    cssClass: 'success-alert',
    message:
      'Abstract submitted successfully. You can check the status under your Profile Page.',
    buttons: ['Dismiss'],
  });

  await alert.present();
}
