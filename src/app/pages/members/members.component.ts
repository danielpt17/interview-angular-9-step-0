import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ListItem } from "../../common/models/list-item";
import { EMPTY, Observable, of, Subscription } from "rxjs";
import {
  FetchMembers,
  SetMemberHierarchy,
} from "../../ngrx/action/members.actions";
import { select, Store } from "@ngrx/store";
import {
  getMembersSelector,
  getMemberHeierarchySelector,
  getMembersLoadingSelector,
  MembersState,
} from "src/app/ngrx/state/members.state";
import { HierarchyService } from "../services/hierarchy.service";
import { catchError, finalize, map, take } from "rxjs/operators";
import { Router } from "@angular/router";
import * as _ from "lodash";

@Component({
  selector: "zi-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersComponent implements OnInit, OnDestroy {
  listItems$: Observable<ListItem[]>;
  subscriptions: Subscription = new Subscription();
  selectedMember: ListItem;
  errorFromResp: string;
  isLoading: boolean = true;
  members$ = this.membersStore.pipe(select(getMembersSelector));
  loadingMembers$ = this.membersStore.pipe(select(getMembersLoadingSelector));
  selectedMemberHierarchy$ = this.membersStore.pipe(
    select(getMemberHeierarchySelector)
  );
  constructor(
    private readonly membersStore: Store<MembersState>,
    private readonly hierachyService: HierarchyService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.membersStore.dispatch(FetchMembers());
  }

  memberSelected(member: ListItem) {
    this.selectedMember = member;
    this.hierachyService
      .getMemberHierarchyById(this.selectedMember.id)
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false)),
        catchError((err) => {
          this.errorFromResp = _.get(err, "error.error", "Login Failed");
          return EMPTY;
        }),
        map((hierarchies) => {
          return hierarchies.split("->").map((hierarchy) => hierarchy.trim());
        })
      )
      .subscribe((hierarchy) => {
        this.membersStore.dispatch(SetMemberHierarchy({ hierarchy }));
      });
  }
  onSelectedHierarchyMember(member: string) {
    this.members$.pipe(take(1)).subscribe((members) => {
      const selectedMember = members.find((m) => m.name === member);
      this.router.navigate(["members", selectedMember.id]);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
