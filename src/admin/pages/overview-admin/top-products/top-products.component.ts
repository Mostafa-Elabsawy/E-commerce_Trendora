import { Component, input } from '@angular/core';
import { DashboardTopProducts } from '../../../../core/models/Admin/overview.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-top-products',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './top-products.component.html',
  styleUrl: './top-products.component.css',
})
export class TopProductsComponent {
  products = input.required<DashboardTopProducts[]>();
  viewProduct(ProductId: number) {
    console.log(ProductId);
  }
}
