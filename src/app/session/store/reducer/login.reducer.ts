import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from '../action/auth.actions';
import { ApiError } from "../../../core/api/api.model";

export interface LoginState {
  loading: boolean;
  error: ApiError;
}

export const initialState: LoginState = {
  loading: false,
  error: null,
};

const loginReducer = createReducer(
  initialState,
  on(LoginActions.login, (state) => (
    {
      ...state,
      loading: true,
      error: null
    }
  )),
  on(LoginActions.loginSuccess, state => (
    {
      ...state,
      loading: false,
      error: null
    }
  )),
  on(LoginActions.loginError, (state, data: { error: ApiError }) => (
    {
      ...state,
      loading: false,
      error: data.error
    }
  )),
);

export function reducer(state: LoginState | undefined, action: Action) {
  return loginReducer(state, action);
}
