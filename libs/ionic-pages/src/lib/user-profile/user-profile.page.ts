// Core
import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, first, Observable, of, switchMap } from 'rxjs';

// Models
import { ROUTE_TREE } from '@conferentia/ionic-pages';
import { countries, Country, User } from '@conferentia/models';

// Services
import { UserService } from '@conferentia/angular-services';
import { AlertController } from '@ionic/angular';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'conferentia-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  public currentUser$: Observable<User | null> = of(null);
  public form: FormGroup | undefined;
  public submitted: boolean = false;

  // ToDo: Put this somewhere else for broad usage (2022/12/05 - RO - #99)
  public courtesyTitles = [
    { title: 'Ph.D', value: 'Ph.D' },
    { title: 'Dr.', value: 'Dr.' },
    { title: 'Prof.', value: 'Prof.' },
    { title: 'Ms', value: 'Ms' },
    { title: 'Miss', value: 'Miss' },
    { title: 'Mrs', value: 'Mrs' },
    { title: 'Ms.', value: 'Ms.' },
    { title: 'Mr.', value: 'Mr.' },
  ];

  public countries: Country[] = countries;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private injector: EnvironmentInjector,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentUser$ = this.userService.currentUser$.asObservable();
    this.buildForm();
  }

  onSubmitButtonClicked() {
    this.submitted = true;

    if (this.form?.valid) {
      this.currentUser$
        .pipe(
          switchMap((user) =>
            this.userService.update({
              ...user,
              ...this.form?.value,
            })
          )
        )
        .subscribe({
          next: (user) => {
            this.userService.currentUser$.next(user);
            this.submitted = false;
            this.injector.runInContext(() => {
              updateAlert();
            });
          },
          error: () => {
            this.submitted = false;
            this.injector.runInContext(() => {
              updateAlert(true);
            });
          },
        });
    }
  }

  onLogoutButtonClicked() {
    this.userService.logout();
    this.router.navigate([ROUTE_TREE.HOME]);
  }

  private buildForm() {
    this.currentUser$
      .pipe(
        filter((x) => !!x),
        first()
      )
      .subscribe((user) => {
        this.form = this.formBuilder.group({
          email: [user?.email, [Validators.email, Validators.required]],
          firstName: [user?.firstName ?? '', Validators.required],
          lastName: [user?.lastName ?? '', Validators.required],
          courtesyTitle: [user?.courtesyTitle ?? '', Validators.required],
          affiliation: [user?.affiliation ?? '', Validators.required],
          country: [user?.country ?? '', Validators.required],
        });
      });
  }
}

async function updateAlert(error = false) {
  const alert = await inject(AlertController).create({
    header: error ? 'Error' : 'Success',
    cssClass: error ? 'error-alert' : 'success-alert',
    message: error
      ? 'There was a problem updating your user profile. Please try again'
      : 'Your user profile was updated successfully!',
    buttons: ['Dismiss'],
  });

  await alert.present();
}
