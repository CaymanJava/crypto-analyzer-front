import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot/forgot-password.component';
import { AuthCallbackComponent } from "./social/auth-callback/auth-callback.component";
import { NoAuthGuard } from "../core/auth/no-auth.guard";

const routes: Routes = [
  {
    path: 'register',
    canActivate: [NoAuthGuard],
    component: RegisterComponent
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    component: LoginComponent
  },
  {
    path: 'forgot',
    canActivate: [NoAuthGuard],
    component: ForgotPasswordComponent
  },
  {
    path: 'social/callback',
    canActivate: [NoAuthGuard],
    component: AuthCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule {
}
