import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { catchError, finalize, tap } from "rxjs/operators";
import { of } from "rxjs";

import * as _ from "lodash";
import { CookieService } from "ngx-cookie-service";
import { AccountState } from "../ngrx/state/account.state";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AppConfig } from "../app.config";
import { LoginService } from "./services/login.service";

@Component({
  selector: "zi-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  username;
  password;
  formGroup: FormGroup;
  errorFromResp: string;
  isLoading: boolean;

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService,
    private store: Store<AccountState>,
    private router: Router,
    private service: LoginService
  ) {
    this.formGroup = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });

    this.username = this.formGroup.get("username");
    this.password = this.formGroup.get("password");
  }

  ngOnInit(): void {}

  submit() {
    this.formGroup["submitted"] = true;
    this.errorFromResp = "";

    this.isLoading = true;
    this.service
      .login(this.username.value, this.password.value)
      .pipe(
        finalize(() => (this.isLoading = false)),
        tap((resp: { account: any; session: string }) => {
          const { session } = resp;
          this.cookiesService.set(
            AppConfig.SESSION_COOKIE_NAME,
            session,
            365,
            "/",
            null,
            true
          );
          this.router.navigate(["/app"]);
        }),
        catchError((err) => {
          this.errorFromResp = _.get(err, "error.error", "Login Failed");
          return of();
        })
      )
      .subscribe();
  }
}
