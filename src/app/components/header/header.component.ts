import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginServiceService } from '../../services/login-service/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private _loginService: LoginServiceService,
    private _router: Router,
  ) {
    this._loginService.authSub.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  ngOnInit() {
    this.isLoggedIn = this._loginService.getAuthStatus();
  }

  logout() {
    this._loginService.logoutUser();
    this._router.navigate(['/login']);
  }
}
