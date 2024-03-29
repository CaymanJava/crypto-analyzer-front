import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionRoutingModule } from './session-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { AuthCallbackComponent } from './social/auth-callback/auth-callback.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SessionRoutingModule,
  ],
  declarations: [RegisterComponent, LoginComponent, ForgotPasswordComponent, AuthCallbackComponent]
})
export class SessionModule {
}
