import { AuthService } from './auth.service';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';


@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authservice = this.injector.get(AuthService);
    console.log(`AddheaderInterceptor - ${req.url}`);
    const mytoken = authservice.getToken();
    const jsonReq = req.clone({
      setHeaders: {
        // 'Content-Type': 'application/json',
        token: mytoken || ''
      }
    });
    return next.handle(jsonReq);
  }

}
