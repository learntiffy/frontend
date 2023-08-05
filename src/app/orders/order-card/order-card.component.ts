import { Component, OnInit, Input } from '@angular/core';
import { FeedbackEvent } from 'src/app/models/FeedbackEvent';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() order!: Order;
  @Input() segment!: string;
  allItemsName = '';
  total = 0;

  showFeedbackModal = false;
  selectedOrderId!: string;

  constructor() {}

  ngOnInit() {
    this.order.items.forEach((item, i) => {
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
