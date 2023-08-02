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
  segment: string = 'today';
  orders: Order[] = [];
  pastOrders: Order[] = [];
  upcomingOrders: Order[] = [];
  todayOrders: Order[] = [];
  isLoading: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getOrders();
    this.segment = 'today';
    this.userService.setHeaderTitle(Page.ORDERS);
  }

  onSegmentChange(event: any) {
    this.segment = event.detail.value;
  }

  getOrders() {
    this.isLoading = true;
    this.userService.getOrders().subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.orders = response.data;
          this.filterByDate(this.orders);
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.isLoading = false;
      },
    });
  }

  filterByDate(orders: Order[]) {
    orders.forEach(order => {
      const mealDate = new Date(order.mealDate);
      const currDate = new Date();

      mealDate.setHours(0,0,0,0);
      currDate.setHours(0,0,0,0);

      if(mealDate.valueOf() === currDate.valueOf()) {
        this.todayOrders.push(order);
      } else if(mealDate > currDate) {
        this.upcomingOrders.push(order);
      } else {
        this.pastOrders.push(order)
      }
    })
  }
}
