import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./components/list/list.component";
import { MembersComponent } from "./members/members.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { PagesComponent } from "./pages.component";
import { ZiCommonModule } from "../common/common.module";
import { EffectsModule } from "@ngrx/effects";
import { MembersEffects } from "../ngrx/effect/members.effects";
import { MembersService } from "./services/members.service";
import { HierarchyComponent } from "./components/hierarchy/hierarchy.component";
import { HierarchyService } from "./services/hierarchy.service";
import { MemberComponent } from "./members/member/member.component";
import { PagesRoutingModule } from "./pages-routing.module";

@NgModule({
  imports: [
    CommonModule,
    ZiCommonModule,
    PagesRoutingModule,
    EffectsModule.forRoot([MembersEffects]),
  ],
  declarations: [
    ListComponent,
    HierarchyComponent,
    MembersComponent,
    MemberComponent,
    NavBarComponent,
    PagesComponent,
  ],
  providers: [MembersService, HierarchyService],
})
export class PagesModule {}
