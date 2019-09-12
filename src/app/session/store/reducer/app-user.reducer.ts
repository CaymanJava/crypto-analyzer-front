import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../action/auth.actions';
import { AppUser } from "../../../core/member/member.model";

export interface AppUserState {
  loading: boolean;
  appUser: AppUser;
}

export const initialState: AppUserState = {
  loading: false,
  appUser: AppUser.anonymousUser()
};

const registerReducer = createReducer(
  initialState,
  on(AuthActions.loadUser, (state) => (
    {
      ...state,
      loading: true
    }
  )),
  on(AuthActions.setUser, ((state, data: { user: AppUser }) => (
      {
        ...state,
        appUser: data.user,
        loading: false
      }
    )
  )),
);

export function reducer(state: AppUserState | undefined, action: Action) {
  return registerReducer(state, action);
}
