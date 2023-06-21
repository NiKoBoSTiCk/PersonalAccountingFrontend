import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  showSpinner = false;
  currentUser: any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.showSpinner = true;
    this.authService.login(this.form.email, this.form.password).subscribe({
        next: (data) => {
          this.currentUser = new User(
            data.token,
            data.id,
            data.username,
            data.email
          );
          this.tokenStorage.saveToken(this.currentUser.token);
          this.tokenStorage.saveUser(this.currentUser);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          window.location.reload();
          return;
        },
        error: () => {
          this.isLoginFailed = true;
          this.showSpinner = false;
        }
    });
    this.isLoginFailed = true;
    this.showSpinner = false;
  }
}
