import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import {TokenStorageService} from "../../services/token-storage/token-storage.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";


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

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

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
      next: (data): void => {
        let user: User = new User(
          data.token,
          data.username,
          data.email,
          data.tokenType
        );
        this.tokenStorage.saveToken(user.token);
        this.tokenStorage.saveUser(user);
        this.isSignupFailed = false;
        this.isLoggedIn = true;
        this.showSpinner = false;
        void this.router.navigate(['/documents'])
      },
      error: (): void => {
        this.isSignupFailed = true;
        this.showSpinner = false;
      }
    });
  }
}
