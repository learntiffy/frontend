import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Page } from '../models/Page';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  segment: string = 'upcoming';

  constructor(private userService: UserService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.userService.setHeaderTitle(Page.ORDERS);
  }
}
