import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: any;
  showComment = false;
  constructor() { }

  ngOnInit() {
  }

  // toggle the comment form to show or hide
  toggleComment() {
    this.showComment = !this.showComment;
  }
  ischecked(flag) {
    if (flag === 'f') {
      return true;
    }
    return false;
  }
}
