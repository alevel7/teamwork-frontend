import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-userposts',
  templateUrl: './userposts.component.html',
  styleUrls: ['./userposts.component.css']
})
export class UserpostsComponent implements OnInit {
  myposts: any;
  constructor(private router: Router, private route: ActivatedRoute, private articleservice: ArticleService) { }

  ngOnInit() {
    this.myposts = this.route.snapshot.data.resolvedData.data;
  }

}
