import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import {TokenStorageService} from "../../services/token-storage/token-storage.service";
import {User} from "../../models/user";


@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isLoggedIn = false;
  isSignupFailed = false;
  showSpinner = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.showSpinner = true;
    this.isSignupFailed = false;
    this.authService.signup(username, email, password).subscribe({
      next: (data) => {
        try {
          let user = new User(
            data.token,
            data.username,
            data.email,
            data.tokenType
          );
          this.tokenStorage.saveToken(user.token);
          this.tokenStorage.saveUser(user);
          this.isSignupFailed = false;
          this.isLoggedIn = true;
          window.location.reload();
          return;
        } catch (error) {
          this.isSignupFailed = true;
          this.showSpinner = false;
        }
      }
    });
  }
}
