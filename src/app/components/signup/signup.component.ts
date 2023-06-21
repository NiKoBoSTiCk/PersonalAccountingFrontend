import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import {TokenStorageService} from "../../services/token-storage/token-storage.service";


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

    this.authService.signup(username, email, password).subscribe({
      next: () => {
        this.isSignupFailed = true;
        this.isLoggedIn = true;
      },
      error: () => {
        this.isSignupFailed = false;
      }
    });
  }
}
