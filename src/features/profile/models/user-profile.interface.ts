import { IAddress } from './address.interface';

export interface IUserProfile {
  initials: string;
  name: string;
  email: string;
  phone: string;
  address: IAddress | null;
  ordersCount: number;
  savedCount: number;
  totalSpent: number;
}
