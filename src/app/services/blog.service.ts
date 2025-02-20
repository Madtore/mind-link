import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePost } from '../common/Post/creatPost';
import { map, Observable } from 'rxjs';
import { GetPostDto } from '../common/Post/getPostDto';
import { LocalStorageService } from './auth/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogUrl = 'http://localhost:8080/api/v1/blog';

  constructor(private httpClient: HttpClient) { }

  createPost(post: CreatePost): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('category', post.category);
    formData.append('email', post.email);

    if (post.image) {
      formData.append('image', post.image, post.image.name);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${LocalStorageService.getToken()}`);
    return this.httpClient.post(`${this.blogUrl}/createPost`, formData,{ headers });
  }

  loadPosts():Observable<GetPostDto[]>{
    return this.httpClient.get<GetPostDto[]>(`${this.blogUrl}/`)
  }

  getPostById(id: number): Observable<GetPostDto> {
    return this.httpClient.get<GetPostDto>(`${this.blogUrl}/${id}`);
  }
}
