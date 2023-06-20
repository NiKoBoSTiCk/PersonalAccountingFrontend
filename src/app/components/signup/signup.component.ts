import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";


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
  isSuccessful = false;
  isSignupFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: () => {
        this.isSuccessful = true;
        this.isSignupFailed = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isSignupFailed = true;
      }
    });
  }
}
