import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import {User} from "../../models/user";

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
  errorMessage = '';
  currentUser: any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
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
          this.reloadPage();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
