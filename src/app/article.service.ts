import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable , BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private socket = io('https://myteamworkproject.herokuapp.com');
  public baseUrl = 'https://myteamworkproject.herokuapp.com';
  private feeds = 'https://myteamworkproject.herokuapp.com/v1/feed';
  private postArticleUrl = 'https://myteamworkproject.herokuapp.com/v1/articles';
  private postImageUrl = 'https://myteamworkproject.herokuapp.com/v1/gifs';
  private getImageUrl = 'https://myteamworkproject.herokuapp.com/v1/gifs';
  private postCommentToArticleUrl = 'https://myteamworkproject.herokuapp.com/v1/articles/id/comment';
  private postCommentToGifUrl = 'https://myteamworkproject.herokuapp.com/v1/gifs/id/comment';
  private getUserPostsUrl = 'https://myteamworkproject.herokuapp.com/v1/feed/userId';
  public myData = new BehaviorSubject([]); // a behavior subject that holds all feeds

  constructor(private http: HttpClient, private router: Router) { }

  // get all article and images
  getFeeds() {
    const feeds = this.http.get<any>(this.feeds);
    return feeds;
  }
  updateFeed() {
    this.getFeeds().subscribe(data => {
      this.myData.next(data.data);
    });
  }
  // post a single article
  postArticle(content) {
    return this.http.post(this.postArticleUrl, content);
  }

  // get a specific article with its comments
  getArticle(id) {
    return this.http.get(`${this.postArticleUrl}\\${id}`);
  }

  // get a specific gif
  getGif(id) {
    return this.http.get(`${this.getImageUrl}\\${id}`);
  }

  // add comment to an article
  addArticleComment(id, comment) {
    if (this.router.url.startsWith('/article')) {
      return this.http.post(this.postCommentToArticleUrl.replace('id', id), comment);
    } else if (this.router.url.startsWith('/gifs')) {
      return this.http.post(this.postCommentToGifUrl.replace('id', id), comment);
    }

  }
  postImage(data: FormData): Observable<Response> {
    return this.http.post<any>(this.postImageUrl, data);
  }

  // view all posts by specific user
  getUserPosts() {
    return this.http.get(this.getUserPostsUrl);
  }

  // emit an event to notify about new comment
  emitUserComment(data) {
    this.socket.emit('onComment', data);
  }
  newUserComment() {
    const observable = new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('newUserComment', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }
}
