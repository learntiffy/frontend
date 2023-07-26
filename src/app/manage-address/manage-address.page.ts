import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Page } from '../models/Page';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.page.html',
  styleUrls: ['./manage-address.page.scss'],
})
export class ManageAddressPage implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.userService.setHeaderTitle(Page.ADDRESS);
  }
}
