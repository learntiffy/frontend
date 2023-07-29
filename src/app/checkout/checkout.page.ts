import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Page } from '../models/Page';
import { Item } from '../models/Item';
import { Address } from '../models/request/Address';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { ItemType } from '../models/ItemType';

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
  itemOrderMap = new Map<string, number>([
    [ItemType.SABJI, 1],
    [ItemType.ROTI, 2],
    [ItemType.DAL, 3],
    [ItemType.RICE, 4],
    [ItemType.SPECIAL, 5],
  ]);

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.mealDay = this.route.snapshot.paramMap.get('day') ?? '';
    this.mealType = this.route.snapshot.paramMap.get('meal') ?? '';
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.userService.checkoutMap.forEach((val, key) => {
      this.items.push(...val);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  prepareOrder() {
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    var encryptedOrder;
    if (this.mealDay !== '' && this.mealType !== '') {
      const order = {
        address: this.selectedAddress._id,
        meal: this.mealType,
        mealDate: this.mealDay === 'TODAY' ? today : tomorrow,
        items: this.setOrderItems(),
      };
      console.log({order})
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
    var itemsArray: Item[] = [];
    this.userService.checkoutMap.forEach((val, key) => {
      val.forEach((v) => {
        // items.push(v._id);
        itemsArray.push(v);
      });
    });
    this.sortOrderByType(itemsArray);
    console.log(itemsArray)
    itemsArray.forEach(v => items.push(v._id));
    return items;
  }

  ionViewWillEnter() {
    this.userService.setHeaderTitle(Page.CHECKOUT);
  }

  sortOrderByType(items: Item[]) {
    items.sort(
      (a, b) =>
        (this.itemOrderMap.get(a.type) ?? 0) -
        (this.itemOrderMap.get(b.type) ?? 0)
    );
  }
}
