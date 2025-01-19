import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { timeLog } from 'console';
import { CreatePost } from '../../common/Post/create-post';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent {
  post: CreatePost = new CreatePost('','','',1);
  @Output() unshow = new EventEmitter();

  constructor(private route: Router){

  }
  disapearCreatePost() {
    
    this.unshow.emit();
  }

  postSubmit(title:string, contenido:string, category: string){
    
    this.post.title = title;
    this.post.content = contenido;
    this.post.categoria = category;
    console.log(this.post)
  }

}
