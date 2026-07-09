import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import {OrderStatus} from '../../../core/models/Admin/overview.interface';
import { DashboardRecentOrders } from '../../../core/models/Admin/overview.interface';

@Component({
  selector: 'app-recent-orders',
  imports: [CommonModule],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.css',
})
export class RecentOrdersComponent {
  public recentOrders: DashboardRecentOrders[] = [
    {
      id: 'ORD-2026001',
      buyerEmail: 'ahmed.khaled@gmail.com',
      orderDate: '2026-07-01T09:15:00Z',
      status: 'Pending',
      total: 14999,
    },
    {
      id: 'ORD-2026002',
      buyerEmail: 'salma.ali@gmail.com',
      orderDate: '2026-07-01T10:30:00Z',
      status: 'PaymentReceived',
      total: 8999,
    },
    {
      id: 'ORD-2026003',
      buyerEmail: 'mohamed.hassan@gmail.com',
      orderDate: '2026-07-01T11:45:00Z',
      status: 'Confirmed',
      total: 25999,
    },
    {
      id: 'ORD-2026004',
      buyerEmail: 'nour.ibrahim@gmail.com',
      orderDate: '2026-06-30T16:20:00Z',
      status: 'Shipped',
      total: 4999,
    },
    {
      id: 'ORD-2026005',
      buyerEmail: 'youssef.mamdouh@gmail.com',
      orderDate: '2026-06-30T13:10:00Z',
      status: 'Delivered',
      total: 32999,
    },
    {
      id: 'ORD-2026006',
      buyerEmail: 'mariam.fathy@gmail.com',
      orderDate: '2026-06-29T18:40:00Z',
      status: 'Cancelled',
      total: 6999,
    },
    {
      id: 'ORD-2026007',
      buyerEmail: 'omar.saad@gmail.com',
      orderDate: '2026-06-29T14:55:00Z',
      status: 'PaymentFailed',
      total: 11999,
    },
    {
      id: 'ORD-2026008',
      buyerEmail: 'fatma.elsayed@gmail.com',
      orderDate: '2026-06-28T12:05:00Z',
      status: 'Delivered',
      total: 18999,
    },
  ];

  /**
   * Generates tailwind background, border, and text rules based on status string value.
   */

  public onViewOrderDetails(orderId: string): void {
    console.log(`Inspecting deep logs for purchase target ID: ${orderId}`);
  }
}

