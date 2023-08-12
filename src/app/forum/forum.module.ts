import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForumPageRoutingModule } from './forum-routing.module';

import { AddPostComponent } from './add-post/add-post.component';
import { ForumPage } from './forum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForumPageRoutingModule,
  ],
  declarations: [ForumPage, AddPostComponent],
})
export class ForumPageModule {}
