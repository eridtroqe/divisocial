import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/auth.interface';
import { getPostsRequest } from 'src/app/store/actions/post.actions';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from 'src/app/store/reducers/post.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  posts: Array<Post>;
  postsSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(getPostsRequest({ postsPerPage: 50, currentPage: 1 }));
    this.postsSub = this.store.select(getPosts).subscribe(posts => this.posts = posts);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
