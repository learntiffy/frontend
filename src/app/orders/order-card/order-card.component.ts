import { Component, OnInit, Input } from '@angular/core';
import { FeedbackEvent } from 'src/app/models/FeedbackEvent';
import { Order } from 'src/app/models/Order';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() order!: Order;
  @Input() segment!: string;
  allItemsName = '';
  mealTotal = 0;
  total = 0;
  mealItems: Item[] = [];
  extraSpecialItems: Item[] = [];

  showFeedbackModal = false;
  selectedOrderId!: string;

  constructor() {}

  ngOnInit() {
    this.mealTotal = 0;
    this.total = 0;
    this.order.items.forEach((item, i) => {
      if (['SPECIAL', 'EXTRA'].includes(item.type)) {
        this.extraSpecialItems.push(item);
      } else {
        this.mealItems.push(item);
        this.mealTotal += item.price;
      }
      this.total += item.price;
      if (i < this.order.items.length - 1) {
        this.allItemsName += item.name + ', ';
      } else {
        this.allItemsName += item.name;
      }
    });
  }

  openFeedbackModel() {
    this.showFeedbackModal = true;
  }

  closeModal(event: FeedbackEvent) {
    this.showFeedbackModal = false;
    if (event.isSubmitted) {
      this.order.feedback = { foodRating: event.foodRating, comment: '' };
    }
  }

  rateFood(orderId: string) {
    this.selectedOrderId = orderId;
    this.showFeedbackModal = true;
  }
}
