import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Page } from '../models/Page';

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
