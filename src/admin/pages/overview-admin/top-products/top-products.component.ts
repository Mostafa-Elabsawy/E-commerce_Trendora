import { Component, inject, input } from '@angular/core';
import { DashboardTopProducts } from '../../../../core/models/Admin/overview.interface';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-products',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './top-products.component.html',
  styleUrl: './top-products.component.css',
})
export class TopProductsComponent {
  products = input.required<DashboardTopProducts[]>();
  router=inject(Router);
  failedImages = new Set<number>();

  onImgError(productId: number) {
    this.failedImages.add(productId);
  }

  viewProduct(ProductId: number) {
    this.router.navigate(['/admin/products/view', ProductId]);
  }
}
