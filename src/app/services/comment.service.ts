import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPostDto } from '../common/Post/getPostDto';
import { LocalStorageService } from './auth/local-storage.service';
import { CommentGetDto } from '../common/comment-get-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentUrl = 'http://localhost:8080/api/v1/comment';

  constructor(private httpClient: HttpClient  ) { }
  
  getCommentsByPostId(postId: number): Observable<CommentGetDto[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${LocalStorageService.getToken()}`);
    return this.httpClient.get<CommentGetDto[]>(`${this.commentUrl}/commentByPost/${postId}`, {headers});
  }

}
