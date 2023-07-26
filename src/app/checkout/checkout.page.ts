import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Page } from '../models/Page';
import { Item } from '../models/Item';
import { Address } from '../models/request/Address';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit, OnChanges {
  isLoading = true;
  mealDay = '';
  mealType = '';
  selectedAddress!: Address;
  items: Item[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.mealDay = this.route.snapshot.paramMap.get('day') ?? '';
    this.mealType = this.route.snapshot.paramMap.get('meal') ?? '';
    setTimeout(() => {this.isLoading = false}, 2000)
    this.userService.checkoutMap.forEach((val, key) => {
      this.items.push(...val);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes)
  }


  prepareOrder() {
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    var encryptedOrder;
    console.log(typeof this.selectedAddress)
    if (this.mealDay !== '' && this.mealType !== '') {
      const order = {
        address: this.selectedAddress._id,
        meal: this.mealType,
        mealDate: this.mealDay === 'TODAY' ? today : tomorrow,
        items: this.setOrderItems(),
      };
      console.log(order)
      encryptedOrder = CryptoJS.AES.encrypt(
        JSON.stringify(order),
        environment.AES_SECRET
      ).toString();
    }
    this.isLoading = false;
  }

  setAddress(address: Address) {
    this.selectedAddress = address;
  }

  setOrderItems(): string[] {
    const items: string[] = [];
    this.userService.checkoutMap.forEach((val, key) => {
      val.forEach(v => items.push(v._id));
    });
    return items;
  }

  ionViewWillEnter() {
    this.userService.setHeaderTitle(Page.CHECKOUT);
  }
}
