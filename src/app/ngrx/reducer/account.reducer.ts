import {createReducer, on} from '@ngrx/store';
import {initialAccountState} from '../state/account.state';
import {UpdateAccountDetails} from '../action/account.actions';

export const AccountReducer = createReducer(
  initialAccountState,

  on(UpdateAccountDetails, (state, {payload}) => ({...state, ...payload}))
);
