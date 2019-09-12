import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthModuleState } from '../reducer/reducer';

export const getAuthState = createFeatureSelector<AuthModuleState>('auth');

export const selectAuthUserState = createSelector(
  getAuthState,
  state => state.appUserState
);

export const selectUser = createSelector(
  selectAuthUserState,
  state => state.appUser
);
