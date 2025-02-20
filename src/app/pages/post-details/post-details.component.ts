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
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { CommentGetDto } from '../../common/comment-get-dto';
import { CommentComponent } from "../comment/comment.component";


@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [NgClass, NgIf, CommentComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  
  postId!: number;
  post!: GetPostDto;
  liked!: boolean;
  postLikes!: number;
  comments!: CommentGetDto[];

  constructor(private router: ActivatedRoute,
    private blogService: BlogService,
    private likeService: LikeService,
    private postService: PostService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.postId = this.getPostId();
    this.loadPost()
    this.getLikesPerPost(this.postId);
    this.isLikedByUser(this.postId);
    this.loadComments();
  }

  
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
  private getLikesPerPost(postId: number){
      this.likeService.getLikesPerPost(postId).subscribe(
        (response) => {
          console.log(response);
          this.postLikes = response;
        },
      )
   }
   
  getSafeUrl(base64String: string) {
    return this.postService.getSafeUrl(base64String);
  }
  private isLikedByUser(postId: number) {
    const email: string = LocalStorageService.getUserEmail();
    this.likeService.isLikedByUser(postId, email).subscribe(
      (response) => {
        this.liked = !response;
      }
    )
  }

  private loadComments(){
    this.commentService.getCommentsByPostId(this.postId).subscribe((comments) => {
      this.comments = comments;
      console.log(this.comments);
    })
  }
}
