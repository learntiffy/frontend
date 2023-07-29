import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent  implements OnInit {

  @Input() items!: Item[];
  @Input() total = 0;

  constructor() { }

  ngOnInit() {
  }

}
