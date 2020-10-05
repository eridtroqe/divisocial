import { createReducer, Action, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as postActions from '../actions/post.actions';
import { logout } from '../actions/auth.actions';
import { Post, UploadStatus } from '../../model/auth.interface';

export interface State {
  posts: Array<Post>;
  post: Post;
  totalPosts: number;
  postsPerPage: number;
  page: number;
  uploadStatus: UploadStatus;
  progress: number;
  error: string;
  loading: boolean;
}

export const initialState: State = {
  posts: [],
  post: null,
  totalPosts: 0,
  postsPerPage: 8,
  page: 1,
  uploadStatus: UploadStatus.Ready,
  progress: null,
  error: null,
  loading: false
};

const propertyReducer = createReducer(
  initialState,
  on(postActions.addPostRequest, (state: State, { payload }) => (
    {
      ...state,
      loading: true
    }
  )),
  on(postActions.addPostSuccess, (state: State) => (
    {
      ...state,
      loading: false,
      error: null
    }
  )),
  on(postActions.getPostSuccess, (state: State, { payload }) => (
    {
      ...state,
      post: payload,
      loading: false,
      error: null
    }
  )),
  on(postActions.getPostsSuccess, (state: State, { payload }) => (
    {
      ...state,
      posts: payload.posts,
      totalPosts: payload.postsCount
    }
  )),
  on(postActions.cancelUpload, (state) => ({ ...state, uploadStatus: UploadStatus.Ready, progress: null })),
  on(postActions.startedUpload, (state) => ({ ...state, uploadStatus: UploadStatus.Started, progress: 0 })),
  on(postActions.progressUpload, (state, { progress }) => ({ ...state, progress })),
  on(postActions.completedUpload, (state) => ({ ...state, uploadStatus: UploadStatus.Ready, progress: 0 })),
  on(postActions.uploadFailure, (state, { errorMessage }) => (
    { ...state, uploadStatus: UploadStatus.Failed, progress: null, error: errorMessage })),
  on(logout, () => initialState),
);

export function reducer(state: State | undefined, action: Action) {
  return propertyReducer(state, action);
}

const postsState = createFeatureSelector<State>(postActions.featureKey);

export const getPosts = createSelector(postsState, state => state.posts);
export const getPost = createSelector(postsState, state => state.post);
export const getPostsPerPage = createSelector(postsState, state => state.postsPerPage);
export const getPage = createSelector(postsState, state => state.page);
export const isLoadingPost = createSelector(postsState, state => state.loading);
export const getTotalPosts = createSelector(postsState, state => state.totalPosts);

export const getStarted = createSelector(postsState, (state: State): boolean => state.uploadStatus === UploadStatus.Started);
export const getRequested = createSelector(postsState, (state: State): boolean => state.uploadStatus === UploadStatus.Requested);
export const getReady = createSelector(postsState, (state: State): boolean => state.uploadStatus === UploadStatus.Ready);
export const getProgress = createSelector(postsState, (state: State) => state.progress);
export const getFailed = createSelector(postsState, (state: State): boolean => state.uploadStatus === UploadStatus.Failed);
export const getCompleted = createSelector(postsState, (state: State): boolean => state.uploadStatus === UploadStatus.Completed);
export const getInProgress = createSelector(postsState,
  (state: State): boolean => state.progress >= 0 && state.uploadStatus === UploadStatus.Started);
