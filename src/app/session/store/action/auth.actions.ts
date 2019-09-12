import { createAction, props } from '@ngrx/store';
import { LoginCredentials, RegisterData } from "../../../core/auth/auth.model";
import { ApiError } from "../../../core/api/api.model";
import { AppUser } from "../../../core/member/member.model";

export const register = createAction('[Auth] Register', props<{ registerData: RegisterData }>());
export const registerSuccess = createAction('[Auth] Register success');
export const registerError = createAction('[Auth] Register error', props<{ error: ApiError }>());
export const activate = createAction('[Auth] Activation process');

export const loadUser = createAction('[Auth] Load user');

export const setUser = createAction('[Auth] Set app user', props<{ user: AppUser }>());
export const login = createAction('[Auth] Login', props<{ credentials: LoginCredentials }>());
export const loginSuccess = createAction('[Auth] Login success');
export const loginError = createAction('[Auth] Login error', props<{ error: ApiError }>());


export const logout = createAction('[Auth] Logout');
