import { Component, Input, OnInit } from '@angular/core';
import { GetPostDto } from '../../common/Post/getPostDto';
import { NgClass, NgIf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from '../../services/auth/local-storage.service';
import { LikeService } from '../../services/like.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgIf,NgClass, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  @Input({required:true}) post!: GetPostDto;
  liked!: boolean;
  postLikes!: number;
  constructor(private sanitizer: DomSanitizer, private likeService: LikeService, private router: Router) {}

  ngOnInit(): void {
       this.likeService.getLikesPerPost(this.post.id).subscribe(
        (response) => {
          console.log(response);
          this.postLikes = response;
        }
      );
      this.likeService.isLikedByUser(this.post.id, LocalStorageService.getUserEmail()).subscribe(
        (response) => {
          console.log(response);
          this.liked = !response;
        }
      )
  }
  
  likeUnlike(postId:number) {
    const email: string = LocalStorageService.getUserEmail();
    this.likeService.LikeUnlike(postId, email).subscribe(
      (response) => {
        this.liked = !this.liked;
        this.getLikesPerPost(postId);
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
   getLikesPerPost(postId: number){
      this.likeService.getLikesPerPost(postId).subscribe(
        (response) => {
          console.log(response);
          this.postLikes = response;
        },
      )
   }
   isLikedByUser(postId: number) {
    const email: string = LocalStorageService.getUserEmail();
    this.likeService.isLikedByUser(postId, email).subscribe(
      (response) => {
        console.log(response);
        this.liked = !response;
      }
    )
    
  }
  getSafeUrl(base64String: string) {
    if (!base64String || base64String.trim() === '') return '';
  
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  
    const imageType = this.detectImageType(base64);  
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/${imageType};base64,${base64}`);
  }
  
  private detectImageType(base64: string): string {
    const signature = base64.substring(0, 30);
    if (signature.startsWith('/9j/')) return 'jpeg';
    if (signature.startsWith('iVBORw')) return 'png';
    if (signature.startsWith('R0lGOD')) return 'gif';
    if (signature.startsWith('UklGR')) return 'webp'; 
    return 'jpeg'; 
  }

  browsePost(postId: number) {
    this.router.navigateByUrl(`postsaa`);
  }
}
