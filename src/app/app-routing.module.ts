import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AuthenticationGuardService } from "./core/guards/authentication-guard.service";
import { MemberComponent } from "./pages/members/member/member.component";
import { PagesComponent } from "./pages/pages.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthenticationGuardService],
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
