import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OrdersService } from '../../../../core/services/Admin/orders.service';
import { OrderToReturnDTO, OrderStatus } from '../../../../core/models/Admin/order.interface';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-detail',
  imports: [DatePipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
})
export class OrderDetailComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  order = signal<OrderToReturnDTO | null>(null);
  loading = signal(false);
  isUpdating = signal(false);

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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadOrder(id);
    }
  }

  private loadOrder(id: string): void {
    this.loading.set(true);
    this.ordersService.getOrderById(id).subscribe({
      next: (res) => {
        this.order.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load order:', err);
        this.toastr.error('Failed to load order details');
        this.loading.set(false);
      },
    });
  }

  confirmStatusUpdate(newStatus: OrderStatus): void {
    const current = this.order();
    if (!current || current.status === newStatus) return;

    Swal.fire({
      title: 'Update Order Status',
      text: `Change status from "${current.status}" to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, update',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.isUpdating.set(true);
      this.ordersService.updateOrderStatus(current.id, newStatus).subscribe({
        next: (updated) => {
          this.order.set(updated);
          this.toastr.success(`Order status updated to ${newStatus}`);
          this.isUpdating.set(false);
        },
        error: (err) => {
          console.error('Failed to update order status:', err);
          this.toastr.error('Failed to update order status');
          this.isUpdating.set(false);
        },
      });
    });
  }

  statusClass(status: OrderStatus): string {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'PaymentReceived':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'PaymentFailed':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Confirmed':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Shipped':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/orders']);
  }
}
