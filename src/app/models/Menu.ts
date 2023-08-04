import { Item } from './Item';

export interface Menu {
  items: Item[];
  meal: string;
  name: string;
  isDisabled: boolean;
}
