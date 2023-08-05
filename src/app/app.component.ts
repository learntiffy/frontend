import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { register } from 'swiper/element/bundle';
import { AuthService } from './services/auth.service';
import { PushNotificationService } from './services/push-notification.service';
import { StatusBar, Style } from '@capacitor/status-bar';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private pushNotificationService: PushNotificationService,
    private authService: AuthService,
    private location: Location
  ) {
    StatusBar.setStyle({style : Style.Light})
    this.pushNotificationService.initPush();
    // this.router.events.subscribe((ev) => {
    //   if (ev instanceof NavigationEnd) {
    //     this.checkLoginStatus();
    //   }
    // });

    App.addListener('backButton', () => {
      this.location.back();
    });
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    token ? this.authService.setIsLoggedIn() : this.authService.logout();
  }
}
