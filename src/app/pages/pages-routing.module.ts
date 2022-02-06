import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MemberComponent } from "./members/member/member.component";
import { MembersComponent } from "./members/members.component";
import { PagesComponent } from "./pages.component";

// moriah - why do we need a routing module?

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "app",
        component: MembersComponent,
      },
      {
        path: "members/:id",
        component: MemberComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
