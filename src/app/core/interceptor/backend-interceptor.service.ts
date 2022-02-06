import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../../app.config';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class BackendInterceptorService implements HttpInterceptor {

  constructor(private cookiesService: CookieService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Editing request
    request = request.clone({
      setHeaders: {
        session: this.cookiesService.get(AppConfig.SESSION_COOKIE_NAME)
      }
    });
    // Executing request
    return next.handle(request);
  }
}
