import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { register } from 'swiper/element/bundle';
import { AuthService } from './services/auth.service';
import { PushNotificationService } from './services/push-notification.service';

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
    this.initilizeApp();
    this.pushNotificationService.initPush();
    this.checkLoginStatus();
    App.addListener('backButton', () => {
      this.location.back();
    });
  }

  initilizeApp() {
    if (Capacitor.getPlatform() !== 'web') {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#fa774b' });
    }
  }
  checkLoginStatus() {
     const token = localStorage.getItem('token');
     if(token) this.authService.setIsLoggedIn();
  }
}
