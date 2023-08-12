import { Status } from '../request/Status';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  address: string[];
  status: string;
}
