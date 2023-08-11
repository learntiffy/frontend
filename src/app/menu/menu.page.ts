import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Day } from '../constants/Day';
import { Meal } from '../constants/Meal';
import { Item } from '../models/Item';
import { ItemType } from '../models/ItemType';
import { Menu } from '../models/Menu';
import { MenuWrapper } from '../models/MenuWrapper';
import { Page } from '../models/Page';
import { UserService } from '../services/user.service';
import { MenuDay } from '../constants/MenuDay';

const quantityMap = new Map<string, number>();
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  menuChangedSubject = new Subject<void>();
  Meal = Meal;
  Day = Day;
  MenuDay = MenuDay;
  isLoading = true;
  selectedMeal = Meal.LUNCH;
  selectedDay = 'TODAY';
  menuMap = new Map<string, Menu>();
  itemTypeMap = new Map<string, Item[]>();
  checkOutMap = new Map<string, Item[]>();
  currentMenu?: Menu;
  lunchDeliveryTimeElapsed = false;
  dinnerDeliveryTimeElapsed = false;

  mealOptions = [
    { isDisabled: false, value: Meal.LUNCH, label: 'Lunch' },
    { isDisabled: false, value: Meal.DINNER, label: 'Dinner' },
  ];
  dayOptions = [
    { isDisabled: false, value: Day.TODAY, label: 'Today' },
    { isDisabled: false, value: Day.TOMO, label: 'Tomorrow' },
  ];



  constructor(private userService: UserService, private router: Router) {
    quantityMap.set(ItemType.SABJI, 2);
    quantityMap.set(ItemType.ROTI, 1);
    quantityMap.set(ItemType.DAL, 1);
    quantityMap.set(ItemType.RICE, 1);
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.userService.setHeaderTitle(Page.MENU);
    this.userService.initCheckoutMap();
    this.initItemTypeMap();
    this.getAllMenu();
    this.isTimeElapsed();
  }

  changeMeal(event: any) {
    this.selectedMeal = event.detail.value;
    this.updateMenu();
  }

  changeDay(event: any) {
    this.selectedDay = event.detail.value;
    this.updateMenu();
  }

  private getAllMenu() {
    this.userService.getMenu().subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.createMenuMap(response.data);
          this.updateMenu();
          this.menuChangedSubject.next();
        }
      },
      error: (error: any) => {
        this.userService.presentToast('Some error occured!!');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private updateMenu() {
    this.currentMenu = this.menuMap.get(
      this.selectedDay + '_' + this.selectedMeal
    );
    this.initItemTypeMap();
    this.createItemTypeMap(this.currentMenu);
    this.userService.initCheckoutMap();
    this.menuChangedSubject.next();
  }

  private createMenuMap(data: MenuWrapper[]) {
    data.forEach((menu: any) => {
      menu.menu.isDisabled = !menu.isSet;
      this.menuMap.set(menu.day.toString(), menu.menu);
    });
  }

  isTimeElapsed() {
    const date = new Date();
    this.lunchDeliveryTimeElapsed = date.getHours() >= environment.lunchDisableTime;
    this.dinnerDeliveryTimeElapsed = date.getHours() >= environment.dinnerDisableTime;
  }

  private initItemTypeMap() {
    this.itemTypeMap.set(ItemType.SABJI, []);
    this.itemTypeMap.set(ItemType.DAL, []);
    this.itemTypeMap.set(ItemType.RICE, []);
    this.itemTypeMap.set(ItemType.ROTI, []);
    this.itemTypeMap.set(ItemType.SPECIAL, []);
    this.itemTypeMap.set(ItemType.EXTRA, []);
  }

  private createItemTypeMap(currentMenu: Menu | undefined) {
    if (currentMenu) {
      currentMenu.items.forEach((item) => {
        this.itemTypeMap.get(item.type)?.push(item);
      });
    }
  }

  getItemsByType(type: string) {
    return this.itemTypeMap.get(type);
  }

  proceedToCheckout() {
    if (this.validateCheckoutMap()) {
      this.router.navigate([
        './',
        'checkout',
        this.selectedDay,
        this.selectedMeal,
      ]);
    }
  }

  validateCheckoutMap(): boolean {
    for (let [key, val] of quantityMap.entries()) {
      if (this.userService.checkoutMap.get(key)?.length != val) {
        this.userService.presentToast(
          'Please provide required quantity for ' + key
        );
        return false;
      }
    }
    return true;
  }
}
