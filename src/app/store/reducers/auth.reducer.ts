import { User } from 'src/app/model/auth.interface';
import { createReducer, Action, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false
};


const authReducer = createReducer(
  initialState,
  on(authActions.loginRequest, (state: State) => ({ ...state, error: null, loading: true })),
  on(authActions.loginSuccess, (state: State, { token, email }) => (
    {
      ...state,
      isAuthenticated: true,
      user: {
        token,
        email
      },
      error: null,
      loading: false
    })),
  on(authActions.loginFailure, (state: State, { error }) => ({ ...state, loading: false, error: 'Incorrect email or password.' })),
  on(authActions.authTrue, (state: State) => ({ ...state, isAuthenticated: true })),
  on(authActions.authFalse, (state: State) => ({ ...state, isAuthenticated: false })),
  on(authActions.logout, () => initialState),
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}

const authState = createFeatureSelector<State>(authActions.featureKey);

export const getIsAuth = createSelector(authState, state => state.isAuthenticated);
export const isLoadingAuth = createSelector(authState, state => state.loading);
