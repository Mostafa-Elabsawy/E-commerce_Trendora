import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'Shipped' | 'cacelled' | 'Pending';
}
@Component({
  selector: 'app-recent-orders',
  imports: [CommonModule],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.css',
})
export class RecentOrdersComponent {
  public recentOrders: Order[] = [
    {
      id: '#ORD-94821',
      customer: 'Sophia Martinez',
      date: 'Oct 24, 2026',
      amount: 249.5,
      status: 'Shipped',
    },
    {
      id: '#ORD-94822',
      customer: 'Liam Henderson',
      date: 'Oct 24, 2026',
      amount: 89.0,
      status: 'cacelled',
    },
    {
      id: '#ORD-94823',
      customer: 'Emma Davenport',
      date: 'Oct 23, 2026',
      amount: 512.4,
      status: 'Pending',
    },
  ];

  /**
   * Generates tailwind background, border, and text rules based on status string value.
   */
  public getOrderStatusClass(status: 'Shipped' | 'cacelled' | 'Pending'): string {
    switch (status) {
      case 'Shipped':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'cacelled':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  }

  /**
   * Generates tailwind coloring for the status dot element.
   */
  public getOrderStatusDotClass(status: 'Shipped' | 'cacelled' | 'Pending'): string {
    switch (status) {
      case 'Shipped':
        return 'bg-emerald-500';
      case 'cacelled':
        return 'bg-red-500';
      case 'Pending':
        return 'bg-amber-500';
      default:
        return 'bg-slate-500';
    }
  }

  public onViewOrderDetails(orderId: string): void {
    console.log(`Inspecting deep logs for purchase target ID: ${orderId}`);
  }
}
