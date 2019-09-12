import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { AuthService } from "../../core/auth/auth.service";
import { AuthModuleState } from "../store/reducer/reducer";
import * as loginActions from '../store/action/auth.actions';
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [SharedAnimations]
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean;
  loadingText: string;
  signInForm: FormGroup;
  routerSubscription: Subscription;
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
              private auth: AuthService,
              private store$: Store<AuthModuleState>,
              private router: Router) {

  }

  ngOnInit() {
    this.subscribeToRouterEvents();
    this.initForm();
  }

  login() {
    this.loading = true;
    this.loadingText = 'Sigining in...';
    this.store$.dispatch(loginActions.login({credentials: this.signInForm.value}));
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private initForm() {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private subscribeToRouterEvents() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.loadingText = 'Loading Dashboard Module...';
        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });
  }

}
