import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(name: string, email: string, password: string) {
    return this.http
      .post<{ user: { name; email; _id }; token: string }>(
        'http://localhost:3000/users',
        {
          name,
          email,
          password,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          const user = res.user;
          const token = res.token;

          this.authenticate(user.name, user.email, user._id, token);
        })
      );
  }

  signin(email: string, password: string) {
    return this.http
      .post<{ user: { name; email; _id }; token: string }>(
        'http://localhost:3000/users/login',
        {
          email,
          password,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          const user = res.user;
          const token = res.token;

          this.authenticate(user.name, user.email, user._id, token);
        })
      );
  }

  autoLogin() {
    const userData: {
      name: string;
      email: string;
      id: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const storedUser = new User(
      userData.name,
      userData.email,
      userData.id,
      userData._token
    );
    this.user.next(storedUser);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/signin']);
    localStorage.removeItem('userData');
  }

  private authenticate(name, email, _id, token) {
    const newUser = new User(name, email, _id, token);
    this.user.next(newUser);
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = 'An unknown error occurred!';
    if (!err.error || !err.error.error) {
      return throwError(errMsg);
    }

    return throwError(err.error.error);
  }
}
