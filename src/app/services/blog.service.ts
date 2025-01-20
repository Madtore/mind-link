import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePost } from '../common/Post/create-post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogUrl = 'http://localhost:8080/blog';

  constructor(private httpClient: HttpClient) { }

  createPost(post: CreatePost): Observable<any> {
    return this.httpClient.post(`${this.blogUrl}/createPost`, post);
  }
}
