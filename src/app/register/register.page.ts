import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Page } from '../models/Page';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^[1-9][0-9]{9}$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.userService.setHeaderTitle(Page.REGISTER);
  }

  register() {
    const user = new User(
      this.form.value.firstName ?? '',
      this.form.value.lastName ?? '',
      this.form.value.email ?? '',
      this.form.value.mobile ?? ''
    );
    console.log(this.form.value, user);
    this.authService.registerUser(user).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.userService.presentToast(
            'User created successfully!!!',
            2000,
            'login'
          );
          this.authService.setCurrentUserEmail(user.email);
        } else if (response.status === 401) {
          this.userService.presentToast(response.message);
        }
      },
      error: (error) => {
        this.userService.presentToast(error.message);
      },
    });
  }
}
