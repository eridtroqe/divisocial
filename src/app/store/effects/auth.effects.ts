import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../endpoint/auth.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  createUserRequest,
  createUserSuccess,
  createUserFailure
} from '../actions/auth.actions';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private auth: AuthService) { }

  CreateUserRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createUserRequest),
      map(action => action.payload),
      mergeMap((data) =>
        this.auth.createUser(data.email, data.password).pipe(
          tap(x => console.log('res ', x)),
          map(res => createUserSuccess()),
          catchError(error => of(createUserFailure({ error })
          )))
      ),
    );
  });

  CreateUserSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createUserSuccess),
      tap((user) => {
        this.router.navigate(['auth/login']);
      }));
  }, { dispatch: false });

  LoginRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginRequest),
      map(action => action.payload),
      mergeMap((data) =>
        this.auth.login(data.email, data.password).pipe(
          map(res => loginSuccess({ token: res.token, email: res.email })),
          catchError(error => of(loginFailure({ error })
          )))
      ),
    );
  });

  LoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap((user) => {
        localStorage.setItem('token', user.token);
        this.router.navigate(['/']);
      }));
  }, { dispatch: false });


  Logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem('token');
        this.router.navigate(['auth/login']);
      }));
  }, { dispatch: false });

}
