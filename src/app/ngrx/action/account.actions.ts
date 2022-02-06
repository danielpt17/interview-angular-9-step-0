import {createAction, props} from '@ngrx/store';
import {AccountState} from '../state/account.state';


// Fetch Members
export const UpdateAccountDetails = createAction(
  '[Account] UPDATE_ACCOUNT_DETAILS',
  props<{ payload: AccountState }>()
);

