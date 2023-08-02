import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

const Pages = [
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
    icon: 'bag-handle',
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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Tiffy';
  activeIndex = 0;
  Pages = Pages;
  activePage = 'home';
  isLoggedIn = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.authService.loginStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    console.log(this.isLoggedIn);
    this.userService.title.subscribe((title) => {
      this.title = title;
    });
  }

  onTabChange(event: any) {
    this.activePage = event.tab;
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
  }

  navigatePage(url: string) {
    this.navCtrl.navigateForward(url);
  }
}
