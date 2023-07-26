import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Page } from '../models/Page';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userService.setHeaderTitle(Page.FORUM);
  }

}
