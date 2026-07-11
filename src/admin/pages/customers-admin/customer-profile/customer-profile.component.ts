import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../../core/services/Admin/customer.service';
import {
  CustomerDTO,
  CustomerStatsDTO,
  OrderToReturnDTO,
} from '../../../../core/models/Admin/customers.interface';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-profile',
  imports: [RouterLink, DatePipe],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css',
})
export class CustomerProfileComponent implements OnInit {
  private readonly customerService = inject(CustomerService);
  private readonly route = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);

  customer = signal<CustomerDTO | null>(null);
  stats = signal<CustomerStatsDTO | null>(null);
  orders = signal<OrderToReturnDTO[]>([]);
  router=inject(Router)
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCustomer(id);
      this.loadStats(id);
      this.loadOrders(id);
    }
  }
  veiwOrder(id:string){
    this.router.navigate([`/admin/orders/${id}`])

  }

  private loadCustomer(id: string): void {
    this.customerService.getCustomer(id).subscribe({
      next: (res) => this.customer.set(res),
      error: (err) => {
        console.error('Failed to load customer:', err);
        this.toastr.error('Failed to load customer details');
      },
    });
  }

  private loadStats(id: string): void {
    this.customerService.getCustomerStats(id).subscribe({
      next: (res) => this.stats.set(res),
      error: (err) => {
        console.error('Failed to load stats:', err);
        this.toastr.error('Failed to load customer stats');
      },
    });
  }

  private loadOrders(id: string): void {
    this.customerService.getCustomerOrders(id).subscribe({
      next: (res) => this.orders.set(res),
      error: (err) => {
        console.error('Failed to load orders:', err);
        this.toastr.error('Failed to load customer orders');
      },
    });
  }

  get aov(): number {
    const s = this.stats();
    if (!s || s.totalOrders === 0) return 0;
    return s.totalSpend / s.totalOrders;
  }

  get addressString(): string {
    const firstOrder = this.orders()[0];
    if (!firstOrder?.shipToAddress) return 'No address on file';
    const addr = firstOrder.shipToAddress;
    return `${addr.street}, ${addr.city}, ${addr.country}`;
  }
}
