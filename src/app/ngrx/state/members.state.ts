import { Member } from "../../common/models/member";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface MembersState {
  loading: boolean;
  loaded: boolean;
  total: number;
  members: Member[];
  selectedMemberHierarchy: string[];
}

export const initialMembersState: MembersState = {
  loading: false,
  loaded: false,
  total: 0,
  members: [],
  selectedMemberHierarchy: null,
};

export const membersFeatureSelector =
  createFeatureSelector<MembersState>("members");

export const getMembersSelector = createSelector(
  membersFeatureSelector,
  (state) => state.members
);
export const getMembersLoadingSelector = createSelector(
  membersFeatureSelector,
  (state) => state.loading
);
export const getMemberHeierarchySelector = createSelector(
  membersFeatureSelector,
  (state) => state.selectedMemberHierarchy
);
