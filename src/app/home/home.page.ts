import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { PushNotificationService } from '../services/push-notification.service';
import { Capacitor } from '@capacitor/core';
import { UserService } from '../services/user.service';
import { Page } from '../models/Page';

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
    private noti: PushNotificationService
  ) {}

  ngOnInit(): void {
    if (Capacitor.getPlatform() !== 'web') {
      this.noti.sendNoti().subscribe();
      this.noti.getDeliveredNotifications();
    }
  }

  ionViewWillEnter() {
    this.userService.setHeaderTitle(Page.HOME);
  }
}
