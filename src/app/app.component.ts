import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { register } from 'swiper/element/bundle';
import { AuthService } from './services/auth.service';
import { PushNotificationService } from './services/push-notification.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { UserService } from './services/user.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private pushNotificationService: PushNotificationService,
    private authService: AuthService,
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {
    this.initilizeApp();
    this.pushNotificationService.initPush();
    this.checkLoginStatus();
    App.addListener('backButton', (data) => {
      if (data.canGoBack) this.location.back();
      else App.exitApp();
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (
          !this.userService.isHomePageVisited &&
          !event.url.includes('home')
        ) {
          // this.router.navigate(['home']);
          this.userService.isHomePageVisited = true;
        }
      }
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
    if (token) this.authService.setIsLoggedIn();
  }
}
