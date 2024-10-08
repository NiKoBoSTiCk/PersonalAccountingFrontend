import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {

    return this.http.post(this.authUrl + '/login', {
      email,
      password
    }).pipe(
      catchError(this.handleError<any>('login'))
    );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.authUrl + '/signup', {
      username,
      email,
      password
    }).pipe(
      catchError(this.handleError<any>('signup'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`AuthService: ${message}`);
  }
}
