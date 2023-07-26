import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Address } from 'src/app/models/response/Address';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
})
export class AddressListComponent implements OnInit {

  @Input() showSpinner = true;
  @Output() onAddressChange = new EventEmitter<Address>();

  isLoading = true;
  defaultAddress!: Address;
  isDeleteClicked = false;
  showEditAddress = false;
  addressList!: Address[];
  addressId!: string;

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.isDeleteClicked = false;
      },
    },
    {
      text: 'Delete',
      role: 'confirm',
      handler: (value: any) => {
        this.deleteAddress(this.addressId);
        this.isDeleteClicked = false;
      },
    },
  ];

  constructor(
    private userService: UserService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getAddress();
  }

  private getAddress(): void {
    this.isLoading = true;
    this.userService.getAddress().subscribe({
      next: (res) => {
        if (res.status == 200) {
          this.addressList = res.data;
          this.defaultAddress = this.addressList[0];
          this.onAddressChange.emit(this.defaultAddress);
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.userService.presentToast(err.error);
        this.isLoading = false;
      },
      complete: () => {},
    });
  }

  private deleteAddress(addressId: string) {
    this.userService.deleteAddress(addressId).subscribe({
      next: (res) => {
        if (res.status == 200) {
          this.userService.presentToast('Address deleted !!');
          this.removeAddress(addressId);
        }
      },
      error: (err) => {
        this.userService.presentToast(err.error);
      },
    });
  }

  private removeAddress(addressId: string): void {
    this.addressList = this.addressList.filter(
      (addr) => addr._id !== addressId
    );
    console.log(this.addressList);
    if (this.defaultAddress._id == addressId) {
      this.defaultAddress = this.addressList[0];
    }
  }

  async showConfirm() {
    this.isDeleteClicked = true;
    const alert = await this.alertController.create({
      header: 'Delete address',
      // subHeader: 'Important message',
      message: 'Your selected address will be deleted permanently.',
      buttons: this.alertButtons,
    });

    await alert.present();
  }

  selectAddress(addr: Address) {
    this.addressId = addr._id;
    if (!this.showEditAddress && !this.isDeleteClicked){
      this.defaultAddress = addr;
      this.onAddressChange.emit(this.defaultAddress);
    }
  }

  openEditModal(addressId?: string): void {
    this.addressId = addressId ?? '';
    this.showEditAddress = true;
  }

  onAddressSave(isSuccess: boolean) {
    if (isSuccess) {
      this.getAddress();
    }
    this.showEditAddress = false;
  }
}
