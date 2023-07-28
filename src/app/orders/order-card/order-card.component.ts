import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent  implements OnInit {

  @Input() order!: Order;
  allItemsName = '';
  total = 0;

  showFeedbackModal = false;

  constructor() { }

  ngOnInit() {
    this.order.items.forEach((item, i) => {
      console.log(item, i);
      this.total += item.price;
      if(i < this.order.items.length-1){
        this.allItemsName += (item.name + ', ');
      } else {
        this.allItemsName += item.name;
      }
    })
  }

  openFeedbackModel() {
    this.showFeedbackModal = true;
  }

}
