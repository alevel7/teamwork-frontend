import { ArticleService } from './../article.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  allFeeds = [];
  public datasource = new BehaviorSubject([]);
  form: FormGroup;
  articlePost = {};
  file: File = null;
  imagePreview;
  constructor(private router: Router, private route: ActivatedRoute, private articleservice: ArticleService) { }

  ngOnInit() {
    console.log('feed component waiting');
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      article: new FormControl(null, { validators: [Validators.required] })
    });
    // emits the data from the resolver as the next set of data
    this.articleservice.myData.next(this.route.snapshot.data.resolvedData.data);
    // feed compoenent subscribes to the next set of data, gets it and set it to value of all feeds
    this.articleservice.myData.subscribe(data => this.allFeeds = data);
  }

  postArticle() {
    this.articleservice.postArticle(this.form.value).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
    this.articleservice.updateFeed();
  }

  postgif() {
    const postData = new FormData();
    postData.append('image', this.file);
    this.articleservice.postImage(postData).subscribe(
      (res => console.log(res)),
      (err => console.log(err))
    );
  }


  onImagePicked(event: Event) {
    console.log(event);
    this.file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.file);
  }
}
