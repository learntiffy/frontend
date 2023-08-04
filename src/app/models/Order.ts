import { Feedback } from './Feedback';
import { Item } from './Item';
import { User } from './User';
import { Address } from './response/Address';

export interface Order {
  _id: string;
  user: User;
  address: Address;
  feedback: Feedback;
  items: Item[];
  amount: number;
  paymentMode: string;
  transactionId: string;
  status: string;
  meal: string;
  mealDate: Date;
  orderDate: Date;
}
