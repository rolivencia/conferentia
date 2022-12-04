import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { ROUTE_TREE } from '@conferentia/ionic-pages';

@Component({
  selector: 'conferentia-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  constructor(private auth0Service: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogoutButtonClicked() {
    this.auth0Service.logout();
    this.router.navigate([ROUTE_TREE.HOME]);
  }
}
