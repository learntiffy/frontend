import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class CheckoutPage {
  isLoading = true;
  isSubmitting = false;
  mealDay = '';
  mealType = '';
  selectedAddress!: Address;
  items: Item[] = [];
  extraSpecialItems: Item[] = [];
  additionalComment = '';
  encryptedOrder: any;
  total = 0;
  mealTotal = 0;

  itemOrderMap = new Map<string, number>([
    [ItemType.SABJI, 1],
    [ItemType.ROTI, 2],
    [ItemType.DAL, 3],
    [ItemType.RICE, 4],
    [ItemType.SPECIAL, 5],
  ]);

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.isSubmitting = false;
    this.userService.setHeaderTitle(Page.CHECKOUT);
    this.mealDay = this.route.snapshot.paramMap.get('day') ?? '';
    this.mealType = this.route.snapshot.paramMap.get('meal') ?? '';
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.items = [];
    this.total = 0;
    this.mealTotal = 0;
    this.userService.checkoutMap.forEach((val, key) => {
      if (key === 'SPECIAL' || key === 'EXTRA') {
        this.extraSpecialItems.push(...val);
        this.total += val.reduce((prev, curr) => {
          return prev + curr.price;
        }, 0);
      } else {
        this.items.push(...val);
        this.mealTotal += val.reduce((prev, curr) => {
          return prev + curr.price;
        }, 0);
      }
    });
    this.total += this.mealTotal;

    console.log('ionViewEnter checkout', this.items);
  }

  setAddress(address: Address) {
    this.selectedAddress = address;
  }

  setOrderItems(): string[] {
    const items: string[] = [];
    var itemsArray: Item[] = [];
    this.userService.checkoutMap.forEach((val, key) => {
      val.forEach((v) => {
        itemsArray.push(v);
      });
    });
    this.sortOrderByType(itemsArray);
    itemsArray.forEach((v) => items.push(v._id));
    return items;
  }

  sortOrderByType(items: Item[]) {
    items.sort(
      (a, b) =>
        (this.itemOrderMap.get(a.type) ?? 0) -
        (this.itemOrderMap.get(b.type) ?? 0)
    );
  }

  prepareOrder() {
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (this.mealDay !== '' && this.mealType !== '') {
      const order = {
        address: this.selectedAddress._id,
        meal: this.mealType,
        mealDate: this.mealDay === 'TODAY' ? today : tomorrow,
        items: this.setOrderItems(),
        comment: this.additionalComment,
      };
      this.encryptedOrder = CryptoJS.AES.encrypt(
        JSON.stringify(order),
        environment.AES_SECRET
      ).toString();
    }
    this.isLoading = false;
  }

  placeOrder() {
    if (!this.isSubmitting) {
      this.isSubmitting = true;
      this.isLoading = true;
      this.prepareOrder();
      this.userService.placeOrder(this.encryptedOrder).subscribe({
        next: (response) => {
          if (response.status == 201) {
            this.userService.initCheckoutMap();
            this.router.navigate(['./', 'order-placed']);
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.userService.presentToast('Some error occurred!!!');
          this.isLoading = false;
          this.isSubmitting = false;
        },
      });
    }
  }
}
