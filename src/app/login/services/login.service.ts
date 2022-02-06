import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  /**
   * Login
   * **/
  login(username, password) {
    return this.http.post(`${environment.MEMBERS_API_BASE_DOMAIN}/auth/login`, {username, password});
  }
}
