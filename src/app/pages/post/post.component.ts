import { Component, Input, OnInit } from '@angular/core';
import { GetPostDto } from '../../common/Post/getPostDto';
import { NgClass, NgIf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from '../../services/auth/local-storage.service';
import { LikeService } from '../../services/like.service';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';

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
  constructor(private likeService: LikeService, private router: Router, private postService: PostService) {}

  ngOnInit(): void {
      this.getLikesPerPost(this.post.id);
      this.isLikedByUser(this.post.id);
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
    return this.postService.getSafeUrl(base64String);
  }
}
