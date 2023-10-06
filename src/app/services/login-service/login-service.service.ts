import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  headerOptions: any = null;

  _isLoggedIn: boolean = false;

  authSub = new Subject<any>();

  constructor(private _http: HttpClient) {}

  loginAuth(userObj: any) {
    if (userObj.authcode) {
      console.log('Appending headers');
      this.headerOptions = new HttpHeaders({
        'x-tfa': userObj.authcode,
      });
    }
    return this._http.post(
      'https://recommend-me-book-api.onrender.com/login',
      { uname: userObj.uname, upass: userObj.upass },
      { observe: 'response', headers: this.headerOptions },
    );
  }

  setupAuth() {
    return this._http.post(
      'https://recommend-me-book-api.onrender.com/tfa/setup',
      {},
      { observe: 'response' },
    );
  }

  registerUser(userObj: any) {
    return this._http.post(
      'https://recommend-me-book-api.onrender.com/register',
      { uname: userObj.uname, upass: userObj.upass },
      { observe: 'response' },
    );
  }

  updateAuthStatus(value: boolean) {
    this._isLoggedIn = value;
    this.authSub.next(this._isLoggedIn);
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  }

  getAuthStatus() {
    this._isLoggedIn = localStorage.getItem('isLoggedIn') == 'true' ? true : false;
    return this._isLoggedIn;
  }

  logoutUser() {
    this._isLoggedIn = false;
    this.authSub.next(this._isLoggedIn);
    localStorage.setItem('isLoggedIn', 'false');
  }

  getAuth() {
    return this._http.get('https://recommend-me-book-api.onrender.com/tfa/setup', {
      observe: 'response',
    });
  }

  deleteAuth() {
    return this._http.delete('https://recommend-me-book-api.onrender.com/tfa/setup', {
      observe: 'response',
    });
  }

  verifyAuth(token: any) {
    return this._http.post(
      'https://recommend-me-book-api.onrender.com/tfa/verify',
      { token },
      { observe: 'response' },
    );
  }
}
