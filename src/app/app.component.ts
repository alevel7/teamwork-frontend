import { AuthService } from './login/auth.service';
import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teamwork';
  onloading: boolean;

  constructor(private router: Router, public auth: AuthService) {
    this.router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }



  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.onloading = true;
    }
    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.onloading = false;
    }
  }
}
