import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ArticleService } from '../article.service';


@Injectable({
  providedIn: 'root'
})
export class UserPostsResolver implements Resolve<any> {

  constructor(private articleservice: ArticleService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articleservice.getUserPosts();
  }
}
