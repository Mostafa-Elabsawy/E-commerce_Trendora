
export interface IAddress {
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
}
export interface IOrderItem {
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
export interface IOrder {
  id: string;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: IAddress;
  deliveryMethod: string;
  deliveryCost: number;
  status: string;
  items: IOrderItem[];
  subtotal: number;
  total: number;
   summary?: string;
}