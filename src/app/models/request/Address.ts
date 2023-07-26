export enum AddressType {
  HOME = 'HOME',
  WORK = 'WORK',
  OTHER = 'OTHER',
}

export class Address {
  constructor(
    private homeNo: string,
    private society: string,
    private landmark: string,
    private type: AddressType,
    private area: string,
    private subArea: string,
    private status: string,
    public _id?: string
  ) {}
}
