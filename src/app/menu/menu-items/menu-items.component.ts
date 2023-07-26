import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit {

  @Input() item?: Item;
  @Input() added?: boolean = false;

  @Output() onItemAdded = new EventEmitter<{item: Item, flag: boolean | undefined}>();

  constructor() {}

  ngOnInit() {}

  public onItemAddRemove(item : Item | undefined) {
    if(item){
      this.onItemAdded.next({item: item, flag: this.added});
    }
  }
}
