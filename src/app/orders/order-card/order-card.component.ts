import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent  implements OnInit {

  showFeedbackModal = false;

  constructor() { }

  ngOnInit() {}

  openFeedbackModel() {
    this.showFeedbackModal = true;
  }

}
