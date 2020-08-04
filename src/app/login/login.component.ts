import { logging } from 'protractor';
import { AuthService } from './auth.service';
import { User } from './user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserLogin = new User();
  errorMessage: string;
  loading = false;
  constructor(private router: Router, private auth: AuthService) {  }

  ngOnInit() {
  }
  save(userForm: NgForm) {
    if (userForm && userForm.valid) {
      this.auth.loginUser(userForm.value).subscribe(
        res => {
          sessionStorage.setItem('username', res.data.userData[0].firstName);
          if (res.status === 'success') {
            sessionStorage.setItem('token', res.data.token);
            this.router.navigate(['/feed']);
          }
        },
        err => console.log(err)
      );
      // this.router.navigate(['/products']);
    } else {
      this.errorMessage = 'Please enter a valid username and password';
    }
  }

  display_loader() {
    this.loading = true;
  }
}
