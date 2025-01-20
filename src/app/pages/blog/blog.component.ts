import { Component, OnInit } from '@angular/core';
import { PostFormComponent } from "../post-form/post-form.component";
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { GetPost } from '../../common/Post/get-post';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from "../post/post.component";


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [PostComponent, NgFor],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {

  posts: GetPost[]=[];
  constructor(private router: Router, private blogService: BlogService){

  }
  ngOnInit(): void {
    
    this.blogService.loadPosts().subscribe(
      data =>{
        this.posts = data;
      }
    )
    console.log(this.posts)
  }

  showForm(){
    this.router.navigateByUrl('/add-post/1');
  }


}
