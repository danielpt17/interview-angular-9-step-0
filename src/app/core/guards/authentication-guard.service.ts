import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../../common/services/auth.service';
import {catchError, first, flatMap, map} from 'rxjs/operators';
import {AppConfig} from '../../app.config';
import {UpdateAccountDetails} from '../../ngrx/action/account.actions';
import {Message} from '../../common/models/message.model';
import {MessageType} from '../../common/models/message-type';
import {CookieService} from 'ngx-cookie-service';
import {NotyService} from '../../common/services/noty.service';
import {AccountState} from '../../ngrx/state/account.state';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthenticationGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private cookiesService: CookieService,
              private notyService: NotyService,
              private accountStore: Store<AccountState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  return of(null)
      .pipe(
        first(),
        flatMap(() => {
          const session = this.cookiesService.get(AppConfig.SESSION_COOKIE_NAME);
          if (session) {
            return this.authService.accountDetails();
          }
          return of(null);
        }),
        map((accountResp = null) => {
          if (!accountResp) {
            this.notyService.postMessage(new Message(MessageType.ERROR, 'Session Expired, Please re-login.', 5000));
            this.router.navigate(['./login']);
            return false;
          }
          this.accountStore.dispatch(UpdateAccountDetails({payload: accountResp.account}));
          return true;
        }),
        catchError((err) => {
          this.notyService.postMessage(new Message(MessageType.ERROR, 'Session expired, Please re-login.', 5000));
          this.router.navigate(['./login']);
          return of(false);
        })
      );
  }
}
