import { Component } from '@angular/core';
import { PostFormComponent } from "../post-form/post-form.component";
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

  constructor(private router: Router){

  }

  showForm(){
    this.router.navigateByUrl('/add-post/1');
  }
}
