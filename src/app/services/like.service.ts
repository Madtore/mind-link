import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './auth/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  likeUrl = 'http://localhost:8080/api/v1';

  constructor(private httpClient: HttpClient) { }

  LikeUnlike(postId:number, email: string): Observable<Boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${LocalStorageService.getToken()}`);
    console.log(LocalStorageService.getToken());
    return this.httpClient.post<Boolean>(`${this.likeUrl}/likes`, {postId, email},{ headers });
  }

  getLikesPerPost(postId: number): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${LocalStorageService.getToken()}`);
    console.log(LocalStorageService.getToken());
    return this.httpClient.get<number>(`${this.likeUrl}/likes/${postId}`,{ headers });
  }

  isLikedByUser(postId: number, email: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${LocalStorageService.getToken()}`);
    console.log(LocalStorageService.getToken());
    return this.httpClient.get<boolean>(`${this.likeUrl}/likes/${postId}/${email}`,{ headers });
  }
}
