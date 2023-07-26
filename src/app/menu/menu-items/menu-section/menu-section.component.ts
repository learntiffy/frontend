import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { ItemType } from 'src/app/models/ItemType';
import { UserService } from 'src/app/services/user.service';

const quantityMap = new Map<string, number>([
  [ItemType.SABJI, 2],
  [ItemType.DAL, 1],
  [ItemType.RICE, 1],
  [ItemType.ROTI, 1],
]);
@Component({
  selector: 'app-menu-section',
  templateUrl: './menu-section.component.html',
  styleUrls: ['./menu-section.component.scss'],
})
export class MenuSectionComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isLoading = false;
  @Input() section: string = '';
  @Input() items!: Item[];
  @Input() menuChangedSubject!: Observable<void>;

  selectedItems: Item[] = [];
  requiredQuantity = 1;
  menuChangedSubscription!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.isLoading = true;
    this.requiredQuantity = quantityMap.get(this.section) ?? 1;
    this.selectedItems = [];
    this.setDefaultValue();
    this.menuChangedSubscription = this.menuChangedSubject.subscribe(() => {
      this.selectedItems = [];
      this.requiredQuantity = quantityMap.get(this.section) ?? 1;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes && changes['items']){
        this.items = changes['items'].currentValue;
        this.setDefaultValue();
      }
  }

  addItem(data: any) {
    const item = data.item;
    const flag = data.flag;

    //remove
    if (flag) {
      if (item.type === 'SPECIAL') {
        this.selectedItems = this.selectedItems.filter(
          (i) => i._id !== item._id
        );
      } else if (
        this.selectedItems.length >= this.requiredQuantity &&
        this.items.length != this.requiredQuantity
      ) {
        this.selectedItems = this.selectedItems.filter(
          (i) => i._id !== item._id
        );
      } else {
        this.userService.presentToast(
          'A minimum of ' +
            this.requiredQuantity +
            ' items must be selected for ' +
            this.section +
            '.'
        );
      }
    }
    //add
    else {
      if (item.type === 'SPECIAL') {
        this.selectedItems.push(item);
      } else if (this.selectedItems.length < this.requiredQuantity) {
        this.selectedItems.push(item);
      } else {
        this.userService.presentToast(
          'A maximum of ' +
            this.requiredQuantity +
            ' items can be selected for ' +
            this.section +
            '.'
        );
      }
    }
    this.userService.checkoutMap.set(this.section, this.selectedItems);
  }

  checkIfItemAdded(item: Item): boolean {
    return this.selectedItems.find((i) => i._id === item._id) !== undefined;
  }

  setDefaultValue() {
    if (
      ['ROTI', 'DAL', 'RICE'].includes(this.section) &&
      this.items.length == this.requiredQuantity
    ) {
      this.selectedItems.push(this.items[0]);
      this.userService.checkoutMap.set(this.section, this.selectedItems);
    }
    // this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.menuChangedSubscription.unsubscribe();
  }
}
