import { createReducer, on } from "@ngrx/store";
import { initialMembersState } from "../state/members.state";
import {
  FetchMembers,
  FetchMembersFailure,
  FetchMembersSuccess,
  SetMemberHierarchy,
  ResetMembers,
} from "../action/members.actions";

export const MembersReducer = createReducer(
  initialMembersState,

  on(SetMemberHierarchy, (state, { hierarchy }) => ({
    ...state,
    selectedMemberHierarchy: hierarchy,
  })),

  on(ResetMembers, () => ({ ...initialMembersState })),

  on(FetchMembers, (state) => ({ ...state, loading: true, loaded: false })),

  on(FetchMembersSuccess, (state, { total, members }) => ({
    ...state,
    total,
    members,
    loaded: true,
    loading: false,
  })),

  on(FetchMembersFailure, (state) => ({
    ...state,
    members: [],
    loading: false,
    loaded: true,
  }))
);
