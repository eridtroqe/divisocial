import * as authState from './reducers/auth.reducer';
import * as postState from './reducers/post.reducer';

export interface AppState {
  authState: authState.State;
  postState: postState.State;
}

export const reducers = {
  auth: authState.reducer,
  post: postState.reducer
};
