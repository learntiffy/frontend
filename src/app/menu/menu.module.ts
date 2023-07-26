import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { MenuSectionComponent } from './menu-items/menu-section/menu-section.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage, MenuItemsComponent, MenuSectionComponent]
})
export class MenuPageModule {}
