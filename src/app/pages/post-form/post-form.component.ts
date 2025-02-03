import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeLog } from 'console';
import { CreatePost } from '../../common/post/create-post';
import { BlogService } from '../../services/blog.service';
import { HttpClientModule } from '@angular/common/http';

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

  postSubmit(title: string, contenido: string, category: string) {

    const theId:number = +this.route.snapshot.paramMap.get('id')!;
    const post: CreatePost = new CreatePost(title, contenido, category, theId);
    this.blogService.createPost(post).subscribe(
      (response) => {
        console.log('Post created successfully', response);
        this.router.navigateByUrl('/blog'); // Navigate after successful creation
      },
      (error) => {
        console.error('Error creating post', error); // Handle errors
      }
    );
  }

}
