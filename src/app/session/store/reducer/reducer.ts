import { ActionReducerMap } from '@ngrx/store';
import * as fromRegister from './register.reducer'
import * as fromLogin from './login.reducer'
import * as fromAppUser from './app-user.reducer'

export interface AuthModuleState {
  registerState: fromRegister.RegisterState,
  loginState: fromLogin.LoginState
  appUserState: fromAppUser.AppUserState
}

export const reducers: ActionReducerMap<AuthModuleState> = {
  registerState: fromRegister.reducer,
  appUserState: fromAppUser.reducer,
  loginState: fromLogin.reducer
};
