import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, catchError, mergeMap, concatMap, takeUntil, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TypedAction } from '@ngrx/store/src/models';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { PostsService } from '../../endpoint/posts.service';
import {
  addPostFailure,
  addPostRequest,
  addPostSuccess,
  cancelUpload,
  completedUpload,
  getPostsFailure,
  getPostsRequest,
  getPostsSuccess,
  progressUpload,
  startedUpload,
  uploadFailure
} from '../actions/post.actions';


@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private postService: PostsService) { }

  AddPostRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPostRequest),
      concatMap((action) =>
        this.postService.addPost(action.payload, action.imagePath).pipe(
          takeUntil(this.actions$.pipe(
            ofType(cancelUpload)
          )),
          switchMap(event => this.getActionHttpEvent(event, addPostSuccess)),
          catchError(error => of(addPostFailure({ error })))
        )
      )
    );
  });

  OnAddPostSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPostSuccess),
      tap(() => this.router.navigate(['/'])));
  }, { dispatch: false });

  GetPostsRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getPostsRequest),
      mergeMap((action) =>
        this.postService.getPosts(action.postsPerPage, action.currentPage).pipe(
          map(data => {
            return getPostsSuccess({ payload: data });
          }
          ),
          catchError(error => of(getPostsFailure({ error }))))
      ),
    );
  });



  // GetPropertyRequest$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getPropertyRequest),
  //     map(action => action.id),
  //     mergeMap((id) =>
  //       this.postService.getProperty(id).pipe(
  //         map(data => getPropertySuccess({ payload: data })),
  //         catchError(error => of(getPropertyFailure({ error }))))
  //     ),
  //   );
  // });



  getActionHttpEvent(event: HttpEvent<any>, refresh?: () => TypedAction<string>) {
    switch (event.type) {
      case HttpEventType.Sent:
        return [startedUpload()];
      case HttpEventType.UploadProgress:
        return [progressUpload({ progress: Math.round((100 * event.loaded) / event.total) })];
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response:
        if (event.status === 201) {
          return [completedUpload(), refresh()];
        } else {
          return [uploadFailure({ errorMessage: event.statusText })];
        }

      default:
        return [uploadFailure({ errorMessage: 'An unknown error occurred' })];
    }
  }

}
