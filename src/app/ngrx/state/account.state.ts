import {createFeatureSelector} from '@ngrx/store';


export interface AccountState {
  name?: string;
  id?: string;
  username?: string;
}

export const initialAccountState: AccountState = {
  name: '',
  id: '',
  username: ''
};

export const accountFeatureSelector = createFeatureSelector<AccountState>('account');
