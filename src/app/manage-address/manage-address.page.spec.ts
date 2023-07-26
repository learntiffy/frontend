import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageAddressPage } from './manage-address.page';

describe('ManageAddressPage', () => {
  let component: ManageAddressPage;
  let fixture: ComponentFixture<ManageAddressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
