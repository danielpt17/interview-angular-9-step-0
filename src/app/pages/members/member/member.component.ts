import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { of, Subscription } from "rxjs";
import { catchError, finalize, take } from "rxjs/operators";
import { MembersService } from "../../services/members.service";
import * as _ from "lodash";
import { Member } from "src/app/common/models/member";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  member: Member;
  errorFromResp: string;
  isLoading = true;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef,
    private readonly membersService: MembersService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.membersService
      .getMemberById(id)
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false)),
        catchError((err) => {
          this.errorFromResp = _.get(err, "error.error", "Login Failed");
          return of(null);
        })
      )
      .subscribe((member) => {
        this.member = member;
        this.cdRef.markForCheck();
      });
  }

  backClick() {
    this.router.navigate(["app"]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
