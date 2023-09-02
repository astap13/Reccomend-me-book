import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

interface UserObject {
  uname: string;
  upass: string;
  authcode?: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  tfaFlag: boolean = false;

  userObject: UserObject = {
    uname: '',
    upass: '',
  };

  errorMessage: string | null = null;

  constructor(
    private _loginService: LoginServiceService,
    private _router: Router,
  ) {}

  loginUser() {
    this._loginService.loginAuth(this.userObject).subscribe((data: any) => {
      this.errorMessage = null;
      if (data && data.body && data.body.status === 200) {
        this._loginService.updateAuthStatus(true);
        this._router.navigateByUrl('/recommendation');
      }
      if (data && data.body && data.body.status === 206) {
        this.tfaFlag = true;
      }
      if (data && data.body && data.body.status === 403) {
        this.errorMessage = data.body.message;
      }
      if (data && data.body && data.body.status === 404) {
        this.errorMessage = data.body.message;
      }
    });
  }
}
