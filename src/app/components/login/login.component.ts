import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { User } from "../../models/user";
import { Router } from "@angular/router";

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
    const { email, password } = this.form;
    this.showSpinner = true;
    this.isLoginFailed = false;
    this.authService.login(email, password).subscribe({
      next: (data): void => {
        try {
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
          void this.router.navigate(['/documents']).then((): void => {
            window.location.reload();
          });
        }
        catch (e) {
          this.isLoginFailed = true;
          this.isLoggedIn = false;
          this.showSpinner = false;
        }
      }
    });
  }
}
