import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { Store, StoreModule } from "@ngrx/store";
import { appStateReducer } from "./ngrx/app.state";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { environment } from "../environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ZiCommonModule } from "./common/common.module";
import { BackendInterceptorService } from "./core/interceptor/backend-interceptor.service";
import { AuthenticationGuardService } from "./core/guards/authentication-guard.service";
import { PagesModule } from "./pages/pages.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appStateReducer),
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 50, // Retains last 50 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ZiCommonModule,
  ],
  providers: [
    Store,
    AuthenticationGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
