import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { getFailed, getProgress, getReady, isLoadingPost, getInProgress } from '../../store/reducers/post.reducer';
import { PostsService } from '../../endpoint/posts.service';
import { Post } from '../../model/auth.interface';
import { addPostRequest } from 'src/app/store/actions/post.actions';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview = [];
  filesToUpload: Array<File> = [];
  isInProgress$: Observable<boolean>;
  isReady$: Observable<boolean>;
  hasFailed$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  progress$: Observable<number>;
  error$: Observable<string>;

  constructor(
    public postsService: PostsService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private store: Store<AppState>
  ) {

    this.progress$ = this.store.select(getProgress);
    this.isInProgress$ = this.store.select(getInProgress);
    this.isReady$ = this.store.select(getReady);
    this.hasFailed$ = this.store.select(getFailed);
    this.isLoading$ = this.store.select(isLoadingPost);
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imagePath: [[], Validators.required]
    });

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    const fileArray = Array.from(file);
    if (file === undefined) { return; }

    for (const fil of fileArray) {
      this.form.get('imagePath').updateValueAndValidity();
      this.filesToUpload.push(fil);
      this.form.patchValue({ imagePath: fil });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = [...this.imagePreview, reader.result];
      };
      reader.readAsDataURL(fil);
    }
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    const post: Post = {
      title: this.form.value.title,
      content: this.form.value.content
    };
    console.log('this.form.value', this.form.value);
    console.log('filesToUpload.', this.filesToUpload);
    this.store.dispatch(addPostRequest({ payload: post, imagePath: this.filesToUpload }));
    this.form.reset();
  }

  ngOnDestroy() {
  }

}
