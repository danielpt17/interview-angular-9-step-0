import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotyComponent} from './components/noty/noty.component';
import {ButtonComponent} from './components/button/button.component';
import {LoaderComponent} from './components/loader/loader.component';
import {AuthService} from './services/auth.service';
import {NotyService} from './services/noty.service';
import {CookieService} from 'ngx-cookie-service';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NotyComponent,
    ButtonComponent,
    LoaderComponent
  ],
  providers: [
    AuthService,
    NotyService,
    CookieService
  ],
  exports: [
    NotyComponent,
    ButtonComponent,
    LoaderComponent
  ],
  entryComponents: []
})
export class ZiCommonModule {
}
