import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {LoginService} from './services/login.service';
import {ZiCommonModule} from '../common/common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ZiCommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
