import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OrdersService } from '../../../../core/services/Admin/orders.service';
import { OrderToReturnDTO, OrderStatus } from '../../../../core/models/Admin/order.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-orders',
  imports: [RouterLink, DatePipe],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css',
})
export class ListOrdersComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly toastr = inject(ToastrService);

  orders = signal<OrderToReturnDTO[]>([]);
  loading = signal(false);
  selectedStatus = signal<string>('');

  filteredOrders = computed(() => {
    const filter = this.selectedStatus();
    if (!filter) return this.orders();
    return this.orders().filter((o) => o.status === filter);
  });

  readonly statusOptions: OrderStatus[] = [
    'Pending',
    'PaymentReceived',
    'PaymentFailed',
    'Confirmed',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  ngOnInit(): void {
    this.loadOrders();
  }

  onStatusFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedStatus.set(value);
  }

  private loadOrders(): void {
    this.loading.set(true);
    this.ordersService.getAllOrders().subscribe({
      next: (res) => {
        this.orders.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load orders:', err);
        this.toastr.error('Failed to load orders');
        this.loading.set(false);
      },
    });
  }
}
