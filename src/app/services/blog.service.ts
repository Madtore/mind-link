import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePost } from '../common/post/create-post';
import { map, Observable } from 'rxjs';
import { GetPost } from '../common/post/get-post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogUrl = 'http://localhost:8080/blog';

  constructor(private httpClient: HttpClient) { }

  createPost(post: CreatePost): Observable<any> {
    return this.httpClient.post(`${this.blogUrl}/createPost`, post);
  }

  loadPosts():Observable<GetPost[]>{
    return this.httpClient.get<GetPost[]>(`${this.blogUrl}/`)
  }
}
