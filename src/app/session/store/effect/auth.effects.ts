import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from '../action/auth.actions';
import { AuthService } from "../../../core/auth/auth.service";
import { ApiError } from "../../../core/api/api.model";
import { AppUser, Member } from "../../../core/member/member.model";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

  @Effect()
  register$ =
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap((action) => this.authService.register(action.registerData).pipe(
        map((member: Member) => this.handleRegisterResponse(member, action)),
        catchError((error: ApiError) => of(AuthActions.registerError({error: error}))))
      )
    );

  @Effect({dispatch: false})
  login$ =
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) => this.authService.login(action.credentials)
        .pipe(
          tap(() => this.router.navigate(['dashboard'])),
          catchError((error: ApiError) => of(AuthActions.loginError({error: error})))
        )
      )
    );

  @Effect()
  loginSuccess$ =
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(() => AuthActions.loadUser())
    );

  @Effect({dispatch: false})
  activate$ =
    this.actions$.pipe(
      ofType(AuthActions.activate),
      tap(() => {
        // TODO
      })
    );

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(AuthActions.loadUser),
    exhaustMap(() => this.authService.getAppUser().pipe(
      map(appUser => AuthActions.setUser({user: appUser})),
      catchError(() => of(AuthActions.setUser({user: AppUser.anonymousUser()})))
    ))
  );

  @Effect()
  logout$ =
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => AuthActions.setUser({user: AppUser.anonymousUser()}))
    );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }

  private handleRegisterResponse(member: Member, action) {
    if (member.status == 'ACTIVE') {
      return AuthActions.login({
        credentials: {
          email: action.registerData.email,
          password: action.registerData.password
        }
      });
    } else {
      return AuthActions.activate()
    }
  }

}
