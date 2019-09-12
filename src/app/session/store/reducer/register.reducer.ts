import { Action, createReducer, on } from '@ngrx/store';
import * as RegisterActions from '../action/auth.actions';
import { ApiError } from "../../../core/api/api.model";

export interface RegisterState {
  loading: boolean;
  error: ApiError;
}

export const initialState: RegisterState = {
  loading: false,
  error: null,
};

const registerReducer = createReducer(
  initialState,
  on(RegisterActions.register, (state) => (
    {
      ...state,
      loading: true,
      error: null
    }
  )),
  on(RegisterActions.registerSuccess, state => (
    {
      ...state,
      loading: false,
      error: null
    }
  )),
  on(RegisterActions.registerError, (state, data: { error: ApiError }) => (
    {
      ...state,
      loading: false,
      error: data.error
    })),
);

export function reducer(state: RegisterState | undefined, action: Action) {
  return registerReducer(state, action);
}
