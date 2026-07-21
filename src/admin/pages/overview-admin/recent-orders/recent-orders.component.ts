import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import {OrderStatus} from '../../../../core/models/Admin/overview.interface';
import { DashboardRecentOrders } from '../../../../core/models/Admin/overview.interface';

@Component({
  selector: 'app-recent-orders',
  imports: [CommonModule],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.css',
})
export class RecentOrdersComponent {
  public recentOrders = input.required<DashboardRecentOrders[]>();
  router = inject(Router);
  public onViewOrderDetails(orderId: string): void {
    this.router.navigate([`/admin/orders/${orderId}`]);
  }
}

