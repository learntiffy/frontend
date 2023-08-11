import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Page } from '../models/Page';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  showOtpInput = false;
  showSpinner = false;
  otp: string = '';
  isSubmitting = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    console.log('entererer');
    this.showOtpInput = false;
    this.isSubmitting = false;
    this.userService.setHeaderTitle(Page.LOGIN);
  }

  sendOTP() {
    this.isSubmitting = true;
    this.authService.loginUser(this.form.value.email ?? '').subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.showOtpInput = true;
        } else if (response.status === 401) {
          this.isSubmitting = false;
          this.userService.presentToast(response.message);
        } else {
          this.isSubmitting = false;
          this.userService.presentToast(response.message);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  verifyOTP() {
    if (this.otp.length == 6) {
      this.showSpinner = true;
      this.authService
        .verifyOTP(this.otp, this.form.controls.email.value ?? '')
        .subscribe({
          next: (response) => {
            if (response.status === 200) {
              localStorage.setItem('token', response.data);
              this.authService.setIsLoggedIn();
              this.router.navigateByUrl('/');
            } else {
              this.userService.presentToast(response.message);
            }
          },
          error: (error) => {
            this.showSpinner = false;
            this.userService.presentToast('Some error occurred!!');
            console.log(error);
          },
          complete: () => {
            this.showSpinner = false;
          },
        });
    }
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }
}
