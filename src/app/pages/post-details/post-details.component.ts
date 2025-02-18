import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { get } from 'http';
import { BlogService } from '../../services/blog.service';
import { error } from 'console';
import { GetPostDto } from '../../common/Post/getPostDto';
import { NgClass, NgIf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from '../../services/auth/local-storage.service';
import { LikeService } from '../../services/like.service';


@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  
  postId!: number;
  post!: GetPostDto;
  liked!: boolean;
  postLikes!: number;

  ngOnInit(): void {
    this.postId = this.getPostId();
    this.loadPost()
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

  constructor(private router: ActivatedRoute,
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    private localStorageService: LocalStorageService,
    private likeService: LikeService
  ) { }
  private getPostId(): number {
    return +this.router.snapshot.paramMap.get('id')!;
  }
  
  private loadPost() {
    this.blogService.getPostById(this.postId).subscribe(
      (response) => {
        this.post = response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  likeUnlike() {
      const email: string = LocalStorageService.getUserEmail();
      this.likeService.LikeUnlike(this.postId, email).subscribe(
        (response) => {
          this.liked = !this.liked;
          this.getLikesPerPost(this.postId);
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


}
