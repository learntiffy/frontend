import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Response } from '../models/response/Response';

const HOST = environment.api_url + 'authe';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserEmail = '';
  isLoggedIn = false;
  public loginStatus = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  public registerUser(user: User): Observable<Response> {
    return this.http.post<Response>(`${HOST}/registerUser`, {
      user: user,
    });
  }

  public setCurrentUserEmail(email: string): void {
    this.currentUserEmail = email;
  }

  public getCurrentUserEmail(): string {
    return this.currentUserEmail;
  }

  public loginUser(email: string): Observable<Response> {
    return this.http.post<Response>(`${HOST}/user/login`, { email: email });
  }

  public verifyOTP(otp: string, email: string): Observable<Response> {
    return this.http.post<Response>(`${HOST}/verifyOTP`, {
      email: email,
      otp: otp,
    });
  }

  public logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.loginStatus.emit(false);
    this.router.navigate(['./', 'login']);
  }

  public setIsLoggedIn() {
    this.isLoggedIn = true;
    this.loginStatus.emit(true);
  }
}
