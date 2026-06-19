import { Component, signal } from '@angular/core';
import { KpiComponent } from '../../components/kpi/kpi.component';
import { ChartsComponent } from '../../components/charts/charts.component';
import { RecentOrdersComponent } from '../../components/recent-orders/recent-orders.component';

@Component({
  selector: 'app-overview-admin',
  imports: [KpiComponent, ChartsComponent,RecentOrdersComponent],
  templateUrl: './overview-admin.component.html',
  styleUrl: './overview-admin.component.css',
})
export class OverviewAdminComponent {
  kpis = signal([
    {
      icon: 'fa-users',
      label: 'Total Users',
      value: '12,450',
      route: 'users'
    },
    {
      icon: 'fa-box',
      label: 'Total Orders',
      value: '3,840',
      route: 'orders'
    },
    {
      icon: 'fa-bag-shopping',
      label: 'Total Products',
      value: '1,245',
      route: 'products'
    },
    {
      icon: 'fa-dollar-sign',
      label: 'Total Revenue',
      value: '$142,380',
      route: 'revenue'
    }
  ]);
  handleCardRouting(route: string) {
    
  }
}
