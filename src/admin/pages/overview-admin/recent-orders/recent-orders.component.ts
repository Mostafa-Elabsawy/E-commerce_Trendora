import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
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

  public onViewOrderDetails(orderId: string): void {
    console.log(`Inspecting deep logs for purchase target ID: ${orderId}`);
  }
}

