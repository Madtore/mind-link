import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeLog } from 'console';
import { CreatePost } from '../../common/Post/creatPost';
import { BlogService } from '../../services/blog.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../services/auth/local-storage.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
  providers: [BlogService]
})
export class PostFormComponent {

  

  constructor(private router: Router, private route: ActivatedRoute, private blogService: BlogService) {}

  disapearCreatePost() {
    this.router.navigateByUrl('/blog')
  }

  postSubmit(title: string, contenido: string, category: string, image: File | null) {

    const email: string = LocalStorageService.getUserEmail()
    const post: CreatePost = new CreatePost(title, contenido, category, email, image);
    this.blogService.createPost(post).subscribe(
      (response) => {
        console.log('Post created successfully', response);
        this.router.navigateByUrl('/blog');
      },
      (error) => {
        console.error('Error creating post', error);
      }
    );
  }

}
