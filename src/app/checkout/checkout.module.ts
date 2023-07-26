import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { CheckoutPage } from './checkout.page';
import { ManageAddressPageModule } from '../manage-address/manage-address.module';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    ManageAddressPageModule
  ],
  declarations: [CheckoutPage, CartComponent]
})
export class CheckoutPageModule {}
