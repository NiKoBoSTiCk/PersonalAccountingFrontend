import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { User } from "../../models/user";

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
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  showSpinner: boolean = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.showSpinner = true;
    this.isLoginFailed = false;
    this.authService.login(email, password).subscribe({
      next: (data): void => {
        let user: User = new User(
          data.token,
          data.username,
          data.email,
          data.tokenType
        );
        this.tokenStorage.saveToken(user.token);
        this.tokenStorage.saveUser(user);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.showSpinner = false;
        window.location.reload();
        return;
      },
      error: (): void => {
        this.isLoginFailed = true;
        this.showSpinner = false;
      }
    });
  }
}
