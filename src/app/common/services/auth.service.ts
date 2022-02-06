import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  /**
   * This request requires sending the "session" header and that's being dealt on the global interceptor app level
   * **/
  accountDetails() {
    return this.http.get(`${environment.MEMBERS_API_BASE_DOMAIN}/auth/accountDetails`);
  }
}
