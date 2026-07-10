export interface CustomerDTO {
    id: string;
    displayName: string;
    email: string;
    phoneNumber?: string;
}
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
export interface OrderItemDTO {
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
export interface AddressDTO {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  country: string;
}
export interface CustomerStatsDTO {
  totalOrders: number;
  totalSpend: number;
}
export type OrderStatus =
  | 'Pending'
  | 'PaymentReceived'
  | 'PaymentFailed'
  | 'Confirmed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';