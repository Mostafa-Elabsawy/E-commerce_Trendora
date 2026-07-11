import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OrdersService } from '../../../../core/services/Admin/orders.service';
import { OrderToReturnDTO, OrderStatus } from '../../../../core/models/Admin/order.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-detail',
  imports: [DatePipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
})
export class OrderDetailComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  @ViewChild('confirmDialog') confirmDialog!: ElementRef<HTMLDialogElement>;

  order = signal<OrderToReturnDTO | null>(null);
  loading = signal(false);
  isUpdating = signal(false);
  pendingStatus = signal<OrderStatus | null>(null);

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
    const selected = this.ordersService.selectedOrder();
    if (selected) {
      this.order.set(selected);
    } else {
      this.toastr.error('No order selected');
      this.router.navigate(['/admin/orders']);
    }
  }

  openConfirmDialog(newStatus: OrderStatus): void {
    const current = this.order();
    if (!current || current.status === newStatus) return;

    this.pendingStatus.set(newStatus);
    this.confirmDialog.nativeElement.showModal();
  }

  closeConfirmDialog(): void {
    this.confirmDialog.nativeElement.close();
    this.pendingStatus.set(null);
  }

  confirmUpdate(): void {
    const current = this.order();
    const newStatus = this.pendingStatus();
    if (!current || !newStatus) return;

    this.isUpdating.set(true);
    this.closeConfirmDialog();

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
