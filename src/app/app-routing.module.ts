import { AdminComponent } from './admin/admin/admin.component';
import { PostDetailsGifResolver } from './postdetails/postdetails/postdetailsgif.resolver.service';
import { PostDetailsResolver } from './postdetails/postdetails/postdetails.resolver.service';
import { LoginGuardGuard } from './login/login-guard.guard';
import { FeedResolver } from './feed/feed.resolver.service';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { PostdetailsComponent } from './postdetails/postdetails/postdetails.component';
import { UserpostsComponent } from './userposts/userposts.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardGuard] },
  { path: 'feed', component: FeedComponent, resolve: { resolvedData: FeedResolver } },
  { path: 'article/:id', component: PostdetailsComponent, resolve: { resolvedData: PostDetailsResolver } },
  { path: 'gifs/:id', component: PostdetailsComponent, resolve: { resolvedData: PostDetailsGifResolver } },
  { path: 'admin', component: AdminComponent},
  { path: 'myposts', component: UserpostsComponent}
];
