import { ArticleService } from './../../article.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostDetailsResolver implements Resolve<any> {
  constructor(private articleservice: ArticleService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = +route.paramMap.get('id');
    return this.articleservice.getArticle(id);
  }
}
