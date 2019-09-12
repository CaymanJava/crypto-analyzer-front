import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterState } from "../store/reducer/register.reducer";
import { Store } from "@ngrx/store";
import { MustMatch } from "../../shared/validators/must-match.validator";
import * as registerActions from '../store/action/auth.actions';

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
              private store$: Store<RegisterState>) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.submitted = true;
    this.store$.dispatch(registerActions.register({registerData: this.registerForm.value}));
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
