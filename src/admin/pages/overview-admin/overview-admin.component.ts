import { Component, computed, inject, signal } from '@angular/core';
import { KpiComponent } from '../../components/kpi/kpi.component';
import { ChartsComponent } from '../../components/charts/charts.component';
import { RecentOrdersComponent } from './recent-orders/recent-orders.component';
import { OverviewService } from '../../../core/services/Admin/overview.service';
import {
  DashboardKPIs,
  DashboardRecentOrders,
  DashboardTopProducts,
  OrderStatus,
} from '../../../core/models/Admin/overview.interface';
import { TopProductsComponent } from './top-products/top-products.component';

@Component({
  selector: 'app-overview-admin',
  imports: [KpiComponent, ChartsComponent, RecentOrdersComponent,TopProductsComponent],
  templateUrl: './overview-admin.component.html',
  styleUrl: './overview-admin.component.css',
})
export class OverviewAdminComponent {
  dashboardService = inject(OverviewService);

  totalNumers = signal<DashboardKPIs>({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  topProducts = signal<DashboardTopProducts[]>([]);
  recentOrders = signal<DashboardRecentOrders[]>([]);
  kpis = computed(() => [
    {
      icon: 'fa-users',
      label: 'Total Users',
      value: this.totalNumers().totalCustomers.toString(),
      route: 'users',
    },
    {
      icon: 'fa-box',
      label: 'Total Orders',
      value: this.totalNumers().totalOrders.toString(),
      route: 'orders',
    },
    {
      icon: 'fa-bag-shopping',
      label: 'Total Products',
      value: this.totalNumers().totalProducts.toString(),
      route: 'products',
    },
    {
      icon: 'fa-dollar-sign',
      label: 'Total Revenue',
      value: this.totalNumers().totalRevenue.toString(),
      route: 'revenue',
    },
  ]);

  loadDashboardKPIS() {
    this.dashboardService.getDashboardKPIs().subscribe({
      next: (res: DashboardKPIs) => {
        console.log('Dashboard data retrived succesfullt', res);
        this.totalNumers.set(res);
      },
      error: (err) => {
        console.error('Failed to load dashboard:', err);
      },
    });
  }
  loadDashboardRecentOrders() {
    this.dashboardService.getDashboardRecentOrders().subscribe({
      next: (res: DashboardRecentOrders[]) => {
        console.log('Dashboard data retrived succesfullt', res);
        this.recentOrders.set(res);
      },

      error: (err) => {
        console.error('Failed to load dashboard:', err);
      },
    });
  }
  loadDashboardTopProducts() {
    this.dashboardService.getDashboardTopProducts().subscribe({
      next: (res: DashboardTopProducts[]) => {
        console.log('Dashboard data retrived succesfullt', res);
        this.topProducts.set(res);
      },
      error: (err) => {
        console.error('Failed to load dashboard:', err);
      },
    });
  }

  handleCardRouting(route: string) {}
  constructor() {
    this.loadDashboardKPIS();
    this.loadDashboardRecentOrders();
    this.loadDashboardTopProducts();
  }
}
