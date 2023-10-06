import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  errorMessage: string | null = null;

  userObject = {
    uname: '',
    upass: '',
  };

  confirmPass: string = '';

  constructor(
    private _loginService: LoginServiceService,
    private _router: Router,
  ) {}

  registerUser() {
    if (
      this.userObject.uname.trim() !== '' &&
      this.userObject.upass.trim() !== '' &&
      this.userObject.upass.trim() === this.confirmPass
    )
      this._loginService.registerUser(this.userObject).subscribe((data: any) => {
        if (data.status === 200) {
          this.errorMessage = data.message;
          setTimeout(() => {
            this._router.navigate(['/login']);
          }, 2000);
        }
      });
  }
}
