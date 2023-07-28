import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Page } from '../models/Page';
import { AuthService } from '../services/auth.service';

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
  {
    title: 'Register',
    url: 'register',
    icon: 'person',
  },
  {
    title: 'Logout',
    url: 'login',
    icon: 'log-out',
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

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.title.subscribe((title) => {
      this.title = title;
    });
  }

  onTabChange(event: any) {
    this.activePage = event.tab;
  }

  navigate(activeIndex: number) {
    if (this.Pages[activeIndex].title === 'Logout') {
      this.authService.logout();
    }
    this.router.navigate(['./', this.Pages[activeIndex].url]);
  }

  navigateTab(event: any) {
    this.router.navigate(['./', this.Pages[this.activeIndex].url]);
  }
}
