import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { Address, AddressType } from 'src/app/models/request/Address';
import { Status } from 'src/app/models/request/Status';
import { Area, SubArea } from 'src/app/models/response/Area';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss'],
})
export class EditAddressComponent implements OnInit {
  @ViewChild('modal', { static: false }) modal!: IonModal;
  @Output() close = new EventEmitter<boolean>();
  @Input() isModalOpen!: boolean;
  @Input() addressId!: string;
  isSubmitting = false;
  isEdit = false;
  AddressType = AddressType;

  areaList!: Area[];
  subAreaList!: SubArea[] | undefined;

  form = new FormGroup({
    _id: new FormControl(null),
    homeNo: new FormControl('', Validators.required),
    society: new FormControl('', [Validators.required]),
    landmark: new FormControl('', [Validators.required]),
    type: new FormControl(AddressType.HOME, Validators.required),
    area: new FormControl('', Validators.required),
    subArea: new FormControl('', Validators.required),
    status: new FormControl(Status.ACTIVE),
  });

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (this.addressId) {
      this.isEdit = true;
      this.getAddress();
    }
    this.getArea();
  }

  getAddress(): void {
    this.userService.getAddressById(this.addressId).subscribe({
      next: (res) => {
        const addr = res.data;
        this.form.setValue({
          homeNo: addr.homeNo,
          society: addr.society,
          landmark: addr.landmark,
          type: addr.type,
          area: addr.area,
          subArea: addr.subArea._id,
          status: addr.status,
          _id: addr._id,
        });
        this.getSubArea();
      },
      error: (err) => {
        this.userService.presentToast(err.error);
      },
    });
  }

  getArea(): void {
    this.userService.getArea().subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.areaList = res.data;
          if (this.areaList && this.areaList.length > 0) {
            this.getSubArea(this.areaList[0]._id);
          }
        }
      },
      error: (err) => {
        this.userService.presentToast(err.error);
      },
    });
  }

  getSubArea(areaId?: string): void {
    if (!areaId) areaId = this.form.value.area ?? '';
    const selectedArea = this.areaList?.filter(
      (area) => area._id === areaId
    )[0];
    if (selectedArea.subAreaList) {
      this.subAreaList = selectedArea.subAreaList;
    } else {
      this.userService.getSubArea(areaId).subscribe({
        next: (res) => {
          if (res.status === 200) {
            selectedArea.subAreaList = res.data;
            this.subAreaList = selectedArea.subAreaList;
          }
        },
        error: (err) => {
          this.userService.presentToast(err.error);
        },
      });
    }
  }

  saveAddress(): void {
    const value = this.form.value;
    if (!this.form.invalid && !this.isSubmitting) {
      this.isSubmitting = true;
      const address = new Address(
        value.homeNo ?? '',
        value.society ?? '',
        value.landmark ?? '',
        value.type ?? AddressType.HOME,
        value.area ?? '',
        value.subArea ?? '',
        value.status ?? '',
        value._id ?? undefined
      );
      this.userService.saveAddress(address).subscribe({
        next: (res) => {
          if (res.status == 200) {
            this.userService.presentToast('Address saved !!');
            this.closeModal(true);
          }
        },
        error: (err) => {
          this.userService.presentToast(err.error);
          this.isSubmitting = false;
        },
      });
    }
  }

  closeModal(isSuccess = false): void {
    this.modal.dismiss();
    this.close.emit(isSuccess);
  }

  onWillDismiss(event: Event) {
    this.closeModal();
  }
}
