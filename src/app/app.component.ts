import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { PushNotificationService } from './services/push-notification.service';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private pushNotificationService: PushNotificationService, private authService: AuthService, private router: Router) {
    this.pushNotificationService.initPush();
    // this.router.events.subscribe((ev) => {
    //   if (ev instanceof NavigationEnd) {
    //     this.checkLoginStatus();
    //   }
    // });
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    token ? this.authService.setIsLoggedIn() : this.authService.logout();
  }
}
