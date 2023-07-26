import { Area, SubArea } from './Area';

export interface Address {
  _id: string;
  homeNo: string;
  society: string;
  landmark: string;
  area: Area;
  type: string;
  status: string;
  subArea: SubArea;
}
