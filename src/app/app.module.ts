import { DurationPipe } from './shared/duration.pipe';
import { AddHeaderInterceptor } from './login/add-headers.interceptor';
import { FeedComponent } from './feed/feed.component';
import { appRoutes } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './feed/post.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { PostdetailsComponent } from './postdetails/postdetails/postdetails.component';
import { AdminComponent } from './admin/admin/admin.component';
import { UserpostsComponent } from './userposts/userposts.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    PostComponent,
    NavbarComponent,
    PostdetailsComponent,
    AdminComponent,
    DurationPipe,
    UserpostsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
