import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MembersService } from "../../pages/services/members.service";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { catchError, map, mergeMap } from "rxjs/operators";
import {
  FetchMembers,
  FetchMembersFailure,
  FetchMembersSuccess,
} from "../action/members.actions";

import * as _ from "lodash";
import { NotyService } from "src/app/common/services/noty.service";
import { Message } from "src/app/common/models/message.model";
import { MessageType } from "src/app/common/models/message-type";

@Injectable()
export class MembersEffects {
  constructor(
    private actions$: Actions,
    private notyService: NotyService,
    private membersService: MembersService
  ) {}

  public fetchMembers$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(FetchMembers),
        mergeMap(() => {
          return this.membersService.getMembers().pipe(
            map((resp) =>
              FetchMembersSuccess({
                total: _.get(resp, "total"),
                members: _.get(resp, "members"),
              })
            ),
            catchError((err) => {
              this.notyService.postMessage(
                new Message(
                  MessageType.ERROR,
                  "Failed Members fetching. Please try again",
                  5000
                )
              );
              return of(FetchMembersFailure());
            })
          );
        })
      )
  );
}
