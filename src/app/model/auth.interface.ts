export interface User {
  id?: string;
  email?: string;
  password?: string;
  token?: string;
  expiresIn?: number;
}

export interface Post {
  _id?: string;
  title: string;
  content: string;
  imagePath?: string;
  date?: string;
}

export enum UploadStatus {
  Ready = 'Ready',
  Requested = 'Requested',
  Started = 'Started',
  Failed = 'Failed',
  Completed = 'Completed'
}

export interface PostsResponse {
  message?: string;
  posts: Array<any>;
  postsCount?: number;
}
