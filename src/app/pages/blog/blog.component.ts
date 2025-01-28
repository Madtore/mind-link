import { Component, OnInit } from '@angular/core';
import { PostFormComponent } from "../post-form/post-form.component";
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { GetPost } from '../../common/Post/get-post';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from "../post/post.component";


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [PostComponent],
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

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
