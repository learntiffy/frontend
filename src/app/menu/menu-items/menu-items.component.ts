import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { ItemType } from 'src/app/models/ItemType';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit {
  @Input() item!: Item;
  @Input() added?: boolean = false;

  @Output() onItemAdded = new EventEmitter<{
    item: Item;
    flag: boolean | undefined;
  }>();

  ngOnInit() {
    this.item.showPrice = ['SPECIAL', 'EXTRA'].includes(this.item.type);
  }

  public onItemAddRemove(item: Item | undefined) {
    if (item) {
      this.onItemAdded.next({ item: item, flag: this.added });
    }
  }
}
