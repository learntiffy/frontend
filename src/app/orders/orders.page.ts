import { Component, OnChanges, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Page } from '../models/Page';
import { Order } from '../models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  segment: string = 'upcoming';
  orders: Order[] = [];
  pastOrders: Order[] = [];
  upcomingOrders: Order[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getOrders();
    this.userService.setHeaderTitle(Page.ORDERS);
  }

  onSegmentChange(event: any) {
    this.segment = event.detail.value;
  }

  getOrders() {
    this.userService.getOrders().subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.orders = response.data;
          this.pastOrders = this.orders.filter(
            (order) => new Date(order.mealDate).getTime() < new Date().getTime()
          );
          this.upcomingOrders = this.orders.filter(
            (order) =>
              new Date(order.mealDate).getTime() >= new Date().getTime()
          );
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
