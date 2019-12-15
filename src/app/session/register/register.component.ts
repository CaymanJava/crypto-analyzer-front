import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterState } from "../store/reducer/register.reducer";
import { Store } from "@ngrx/store";
import { MustMatch } from "../../shared/validators/must-match.validator";
import * as registerActions from '../store/action/auth.actions';
import { SocialAuthService } from "../../core/auth/social.auth.service";
import { Router } from "@angular/router";
import { TokenService } from "../../core/auth/token.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [SharedAnimations]
})
export class RegisterComponent implements OnInit {

  submitted = false;
  registerForm: FormGroup;
  animationConfig = {
    value: '*',
    params: {
      y: '120px',
      opacity: '0',
      delay: '100ms',
      duration: '400ms'
    }
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private socialAuthService: SocialAuthService,
              private tokenService: TokenService,
              private store$: Store<RegisterState>) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.submitted = true;
    this.store$.dispatch(registerActions.register({registerData: this.registerForm.value}));
  }

  signUpWithGoogle(): void {
    this.socialAuthService.signInWithGoogle();
  }

  signUpWithFb() {
    this.socialAuthService.signInWithFB();
  }

  private initForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    }, {
      validator: [
        MustMatch('password', 'passwordRepeat')
      ]
    });
  }

}
