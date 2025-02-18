import { Component, OnInit } from '@angular/core';
import { PostFormComponent } from "../post-form/post-form.component";
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { PostComponent } from "../post/post.component";
import { GetPostDto } from '../../common/Post/getPostDto';
import { LocalStorageService } from '../../services/auth/local-storage.service';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [PostComponent, NgFor],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {

  posts: GetPostDto[]=[];
  constructor(private router: Router, private blogService: BlogService){

  }
  ngOnInit(): void {
    this.blogService.loadPosts().subscribe(
      data =>{
        this.posts = data;
      }
    )
  }

  showForm(){
    this.router.navigateByUrl('/add-post');
  }

  get userRole(){
    return LocalStorageService.getUserRole();
  }
  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
