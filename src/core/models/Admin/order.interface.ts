// order-status.type.ts
export type OrderStatus =
  | 'Pending'
  | 'PaymentReceived'
  | 'PaymentFailed'
  | 'Confirmed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';
  // order-item.model.ts
export interface OrderItemDTO {
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
// address.model.ts
export interface AddressDTO {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  country: string;
}
// order.model.ts

export interface OrderToReturnDTO {
  id: string;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: AddressDTO;
  deliveryMethod: string;
  deliveryCost: number;
  status: OrderStatus;
  items: OrderItemDTO[];
  subtotal: number;
  total: number;
}