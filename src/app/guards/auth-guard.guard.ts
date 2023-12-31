/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private _loginService: LoginServiceService,
    private _router: Router,
  ) {}

  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (this._loginService.getAuthStatus()) {
      return true;
    }

    this._router.navigate(['/login']);

    return false;
  }
}
