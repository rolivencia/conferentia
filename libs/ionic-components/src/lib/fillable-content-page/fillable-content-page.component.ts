import { Component, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import {
  AUTH_ADAPTER,
  AuthAdapter,
  NavigationService,
  UserService,
} from '@conferentia/angular-services';
import { ROUTE_TREE } from '@conferentia/ionic-pages';
import { User } from '@conferentia/models';

@Component({
  selector: 'conferentia-fillable-content-page[content]',
  templateUrl: './fillable-content-page.component.html',
  styleUrls: ['./fillable-content-page.component.scss'],
})
export class FillableContentPageComponent implements OnInit {
  @Input() content: TemplateRef<any> | null = null;

  public currentRoute$: Observable<ActivatedRouteSnapshot | null> = of(null);
  public isAuthenticated$: Observable<boolean> = of(false);
  public currentUser$: Observable<User | null> = of(null);

  constructor(
    @Inject(AUTH_ADAPTER) private authAdapter: AuthAdapter,
    private navigationService: NavigationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentRoute$ = this.navigationService.currentRoute$.asObservable();
    this.currentUser$ = this.userService.currentUser$.asObservable();
    this.isAuthenticated$ = this.authAdapter.isAuthenticated$;
  }

  onLoginClicked() {
    this.authAdapter.loginWithRedirect();
  }

  onUserProfileClicked() {
    this.router.navigate([ROUTE_TREE.USER_PROFILE]);
  }
}
