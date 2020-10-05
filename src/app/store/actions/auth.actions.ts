import { createAction, props } from '@ngrx/store';
import { User } from '../../model/auth.interface';


export const featureKey = 'auth';

export const loginRequest = createAction(`[${featureKey}] loginRequest`, props<{ payload: User }>());
export const loginSuccess = createAction(`[${featureKey}] loginSuccess`, props<{ token: string, email: string }>());
export const loginFailure = createAction(`[${featureKey}] loginFailure`, props<{ error: string }>());

export const createUserRequest = createAction(`[${featureKey}] createUserRequest`, props<{ payload: User }>());
export const createUserSuccess = createAction(`[${featureKey}] createUserSuccess`);
export const createUserFailure = createAction(`[${featureKey}] createUserFailure`, props<{ error: string }>());

export const authTrue = createAction(`[${featureKey}] authTrue`);
export const authFalse = createAction(`[${featureKey}] authFalse`);

export const logout = createAction(`[${featureKey}] logout`);
