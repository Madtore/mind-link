import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePost } from '../common/Post/create-post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogUrl = 'http://localhost:8080/blog';

  constructor(private httpClient: HttpClient) { }

  createPost(post: CreatePost){
    this.httpClient.post(`${this.blogUrl}/`,post)
  }
}
