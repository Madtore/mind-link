import { Component, Input } from '@angular/core';
import { GetPost } from '../../common/Post/get-post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  @Input({required:true}) post!: GetPost;

}
