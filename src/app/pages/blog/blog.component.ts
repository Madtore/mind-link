import { Component } from '@angular/core';
import { PostFormComponent } from "../post-form/post-form.component";
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [PostFormComponent, NgIf],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  show: boolean = false;

  showForm(){
    this.show = true;
    console.log(this.show)
  }
  unshowForm(){
    this.show = false;
  }
}
