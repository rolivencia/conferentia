import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { NavigationService } from '@conferentia/angular-services';
import { AuthService } from '@auth0/auth0-angular';
import { ROUTE_TREE } from '@conferentia/ionic-pages';

@Component({
  selector: 'conferentia-fillable-content-page[content]',
  templateUrl: './fillable-content-page.component.html',
  styleUrls: ['./fillable-content-page.component.scss'],
})
export class FillableContentPageComponent implements OnInit {
  @Input() content: TemplateRef<any> | null = null;

  public currentRoute$: Observable<ActivatedRouteSnapshot | null> = of(null);
  public isAuthenticated$: Observable<any | null> = of(null);

  constructor(
    private auth0Service: AuthService,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentRoute$ = this.navigationService.currentRoute$.asObservable();
    this.isAuthenticated$ = this.auth0Service.isAuthenticated$;
  }

  onLoginClicked() {
    this.auth0Service.loginWithRedirect();
  }

  onUserProfileClicked() {
    this.router.navigate([ROUTE_TREE.USER_PROFILE]);
  }
}
