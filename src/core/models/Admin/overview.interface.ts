export interface Overview { }
export interface DashboardKPIs {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
}
export type OrderStatus =
  | 'Pending'
  | 'PaymentReceived'
  | 'PaymentFailed'
  | 'Confirmed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';
export interface DashboardRecentOrders {
  id: string;
  buyerEmail: string;
  orderDate: string; 
  status: OrderStatus;
  total: number;
}
export interface DashboardTopProducts {
  productId: number;
  productName: string;
  pictureUrl: string;
  totalQuantitySold: number;
  totalRevenue: number;
}
