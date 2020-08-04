import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'https://myteamworkproject.herokuapp.com/v1/auth/signin';
  private registerUrl = 'https://myteamworkproject.herokuapp.com/v1/auth/users';
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);

  }

  loggedIn() {
    return !!sessionStorage.getItem('token');
  }

  getToken() {
    return sessionStorage.getItem('token');
  }
  getUserName() {
    return sessionStorage.getItem('username');
  }
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

}
