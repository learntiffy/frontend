export interface Area {
  _id: string;
  name: string;
  pincode: number;
  status: string;
  subAreaList?: SubArea[];
}

export interface SubArea {
  _id: string;
  name: string;
  pincode: number;
  status: string;
}
