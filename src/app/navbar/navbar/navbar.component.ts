import { ArticleService } from './../../article.service';
import { AuthService } from './../../login/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  data;
  constructor(public authservice: AuthService, public articleservice: ArticleService) {
    this.articleservice.newUserComment().subscribe(data => console.log(data));
  }

  ngOnInit() {
  }

}
