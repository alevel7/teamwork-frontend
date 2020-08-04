import { NgForm } from '@angular/forms';
import { ArticleService } from './../../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Post, User } from './post.interface';

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.component.html',
  styleUrls: ['./postdetails.component.css']
})
export class PostdetailsComponent implements OnInit {
  feed;
  userComment = NgForm;
  user: User = {};
  constructor(private route: ActivatedRoute, private articleservice: ArticleService, private router: Router) { }

  ngOnInit() {
    this.retrieveComments();
  }

  addComment() {
    const id = this.route.snapshot.paramMap.get('id');
    this.articleservice.addArticleComment(id, this.user).subscribe(
      data => {
        const username = sessionStorage.getItem('username');
        const url = this.articleservice.baseUrl + `/article/${id}`;
        this.articleservice.emitUserComment({username, url, id});
        location.reload();
      },
      err => console.log(err));
  }

  retrieveComments() {
    this.feed = this.route.snapshot.data.resolvedData.data;
  }

}
