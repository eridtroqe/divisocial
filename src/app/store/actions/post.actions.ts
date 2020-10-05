import { createAction, props } from '@ngrx/store';
import { Post, PostsResponse } from '../../model/auth.interface';


export const featureKey = 'post';

export const addPostRequest = createAction(`[${featureKey}] addPostRequest`, props<{ payload: Post, imagePath: Array<File> }>());
export const addPostSuccess = createAction(`[${featureKey}] addPostSuccess`);
export const addPostFailure = createAction(`[${featureKey}] addPostFailure`, props<{ error: string }>());


export const getPostsRequest = createAction(`[${featureKey}] getPostsRequest`,
  props<{ postsPerPage: number, currentPage: number }>());
export const getPostsSuccess = createAction(`[${featureKey}] getPostsSuccess`, props<{ payload: PostsResponse }>());
export const getPostsFailure = createAction(`[${featureKey}] getPostsFailure`, props<{ error: string }>());



export const getPostRequest = createAction(`[${featureKey}] getPostRequest`, props<{ id: string }>());
export const getPostSuccess = createAction(`[${featureKey}] getPostSuccess`, props<{ payload: Post }>());
export const getPostFailure = createAction(`[${featureKey}] getPostFailure`, props<{ error: string }>());

export const cancelUpload = createAction(`[${featureKey}] cancelUpload`);
export const startedUpload = createAction(`[${featureKey}] startedUpload`);
export const resetUpload = createAction(`[${featureKey}] resetUpload`);
export const progressUpload = createAction(`[${featureKey}] progressUpload`, props<{ progress: number }>());
export const completedUpload = createAction(`[${featureKey}] completedUpload`);
export const uploadFailure = createAction(`[${featureKey}] uploadFailure`, props<{ errorMessage: string }>());

export const globalSuccess = createAction(`[${featureKey}] globalSuccess`, props<{ message: string }>());
export const globalError = createAction(`[${featureKey}] globalError`, props<{ error: string }>());
