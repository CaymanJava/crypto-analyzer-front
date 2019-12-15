import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { catchError, delay, exhaustMap, filter, map, switchMap, tap } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
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

  @Effect()
  login$ =
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) => this.authService.login(action.credentials)
        .pipe(
          map(() => AuthActions.loginSuccess()),
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

  @Effect({dispatch: false})
  setUser$ = this.actions$.pipe(
    ofType(AuthActions.setUser),
    tap(() => this.router.navigate(['dashboard'])),
    catchError(() => of(AuthActions.setUser({user: AppUser.anonymousUser()})))
  );

  @Effect()
  logout$ =
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => AuthActions.setUser({user: AppUser.anonymousUser()}))
    );

  onAccessTokenChange$ = createEffect(() => fromEvent<StorageEvent>(window, 'storage')
    .pipe(
      filter((evt: StorageEvent) => evt.key === 'access_token'),
      map((event) => this.handleAccessTokenStorageEvent(event))
    ));

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }

  private handleAccessTokenStorageEvent(event) {
    if (event.newValue != null) {
      return AuthActions.loginSuccess();
    } else {
      return AuthActions.logout();
    }
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
