import { Component } from '@angular/core';
import { Page } from '../models/Page';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.page.html',
  styleUrls: ['./manage-address.page.scss'],
})
export class ManageAddressPage {
  constructor(private userService: UserService) {}

  ionViewWillEnter() {
    this.userService.setHeaderTitle(Page.ADDRESS);
  }
}
