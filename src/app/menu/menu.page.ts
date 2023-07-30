import { Component, OnInit } from '@angular/core';
import { Meal } from '../constants/Meal';
import { UserService } from '../services/user.service';
import { Menu } from '../models/Menu';
import { Item } from '../models/Item';
import { MenuWrapper } from '../models/MenuWrapper';
import { ItemType } from '../models/ItemType';
import { Page } from '../models/Page';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const quantityMap = new Map<string, number>(  );
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  Meal = Meal;
  selectedMeal = Meal.LUNCH;
  selectedDay = 'TODAY';
  menuMap = new Map<string, Menu>();
  itemTypeMap = new Map<string, Item[]>();
  checkOutMap = new Map<string, Item[]>();
  currentMenu?: Menu;

  isLoading = true ;

  menuChangedSubject = new Subject<void>();

  constructor(private userService: UserService, private router: Router) {
    quantityMap.set(ItemType.SABJI, 2);
    quantityMap.set(ItemType.ROTI, 1);
    quantityMap.set(ItemType.DAL, 1);
    quantityMap.set(ItemType.RICE, 1);
  }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    console.log('ionviewenter');
    this.isLoading = true;
    this.userService.setHeaderTitle(Page.MENU);
    this.userService.initCheckoutMap();
    this.initItemTypeMap();
    this.getAllMenu();
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
    console.log(this.currentMenu)
    this.initItemTypeMap();
    this.createItemTypeMap(this.currentMenu);
    this.userService.initCheckoutMap();
    this.menuChangedSubject.next();
  }

  private createMenuMap(data: MenuWrapper[]) {
    data.forEach((menu: any) => {
      this.menuMap.set(menu.day.toString(), menu.menu);
    });
  }

  private initItemTypeMap() {
    this.itemTypeMap.set(ItemType.SABJI, []);
    this.itemTypeMap.set(ItemType.DAL, []);
    this.itemTypeMap.set(ItemType.RICE, []);
    this.itemTypeMap.set(ItemType.ROTI, []);
    this.itemTypeMap.set(ItemType.SPECIAL, []);
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
    if(this.validateCheckoutMap()){
      this.router.navigate(['./', 'checkout', this.selectedDay, this.selectedMeal]);
    }
  }

  validateCheckoutMap() : boolean {
    for (let [key, val] of  quantityMap.entries()) {
      if(this.userService.checkoutMap.get(key)?.length != val) {
        this.userService.presentToast('Please provide required quantity for ' + key);
        return false;
      }
    }
    return true;
  }
}
