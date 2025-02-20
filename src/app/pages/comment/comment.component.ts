import { Component, Input, OnInit } from '@angular/core';
import { CommentGetDto } from '../../common/comment-get-dto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {
  

  @Input({required:true}) comment!: CommentGetDto;
  ngOnInit(): void {
    console.log(this.comment.userName);
  }
}
