import { Component } from '@angular/core';
import { Page } from '../models/Page';
import { UserService } from '../services/user.service';
import { Post } from '../models/response/Post';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage {
  showPostModal = false;
  isLoading = true;
  posts!: Post[];

  constructor(private userService: UserService) {}

  ionViewWillEnter() {
    this.userService.setHeaderTitle(Page.FORUM);
    this.getPosts();
  }

  getPosts(): void {
    this.isLoading = true;
    this.userService.getPosts().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.posts = res.data.map((post: any) => {
          post.postDate = new Date(post.postDate);
          return post;
        });
        console.log(res);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.userService.presentToast(err.error);
      },
    });
  }

  closeModal(isPostSubmitted: boolean) {
    if (isPostSubmitted) this.getPosts();
    this.showPostModal = false;
  }
}
