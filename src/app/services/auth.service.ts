import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient, private router: Router) {}

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
    return this.http.post<Response>(`${HOST}/verifyOTP`, {email : email, otp: otp});
  }

  public logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['./','login']);
  }

  public setIsLoggedIn() {
    this.isLoggedIn = true;
  }
}
