import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post, PostsResponse } from '../model/auth.interface';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  addPost(post: Post, imagePath: Array<File>): Observable<any> {

    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);

    for (let i = 0; i < imagePath.length; i++) {
      postData.append('imagePath', imagePath[i]);
    }

    return this.http.post<any>(BACKEND_URL + '/posts', postData, { reportProgress: true, observe: 'events' });
  }

  getPosts(postsPerPage: number, currentPage: number): Observable<PostsResponse> {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<PostsResponse>(BACKEND_URL + '/posts' + queryParams);
  }

}
