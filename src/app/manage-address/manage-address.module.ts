import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageAddressPageRoutingModule } from './manage-address-routing.module';

import { ManageAddressPage } from './manage-address.page';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddressListComponent } from './address-list/address-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageAddressPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ManageAddressPage, EditAddressComponent, AddressListComponent],
  exports: [AddressListComponent],
})
export class ManageAddressPageModule {}
