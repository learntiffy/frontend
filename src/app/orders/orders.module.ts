import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { OrderCardComponent } from './order-card/order-card.component';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { RatingComponent } from './feedback-modal/rating/rating.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule
  ],
  declarations: [OrdersPage, OrderCardComponent, FeedbackModalComponent, RatingComponent]
})
export class OrdersPageModule {}
