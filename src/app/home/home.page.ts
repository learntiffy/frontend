import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Page } from '../models/Page';
import { AuthService } from '../services/auth.service';
import { PushNotificationService } from '../services/push-notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  Pages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home',
    },
    {
      title: 'Menu',
      url: 'menu',
      icon: 'fast-food',
    },
    {
      title: 'Orders',
      url: 'orders',
      icon: 'person',
    },
    {
      title: 'Manage Address',
      url: 'manage-address',
      icon: 'book',
    },
    {
      title: 'Forum',
      url: 'forum',
      icon: 'chatbubbles',
    },
  ];
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private noti: PushNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (Capacitor.getPlatform() !== 'web') {
      this.noti.sendNoti().subscribe();
      this.noti.getDeliveredNotifications();
    }
  }

  ionViewWillEnter() {
    this.checkLoginStatus();
    this.userService.setHeaderTitle(Page.HOME);
    this.userService.isHomePageVisited = true;
  }

  public checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) this.authService.setIsLoggedIn();
  }
}
