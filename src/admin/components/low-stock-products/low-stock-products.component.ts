import { Component, input } from '@angular/core';
import { DashboardTopProducts } from '../../../core/models/Admin/overview.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-low-stock-products',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './low-stock-products.component.html',
  styleUrl: './low-stock-products.component.css',
})
export class LowStockProductsComponent {
  // Utilizing modern Angular input signal API
  products = input.required<DashboardTopProducts[]>();
  doSomething(product: DashboardTopProducts) {}
  topProducts: DashboardTopProducts[] = [
    {
      productId: 101,
      productName: 'Pro Wireless Mechanical Keyboard (RGB)',
      pictureUrl:
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&auto=format&fit=crop&q=60',
      totalSold: 142,
      totalRevenue: 18460.0,
    },
    {
      productId: 102,
      productName: 'Ergonomic Vertical Mouse v2',
      pictureUrl:
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=150&auto=format&fit=crop&q=60',
      totalSold: 98,
      totalRevenue: 5782.0,
    },
    {
      productId: 103,
      productName: 'UltraWide 4K Monitor Arm Desk Mount',
      pictureUrl:
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&auto=format&fit=crop&q=60',
      totalSold: 45,
      totalRevenue: 4050.0,
    },
    {
      productId: 104,
      productName: 'USB-C Multi-Port Hub Adapter (8-in-1)',
      pictureUrl: '', // Testing the placeholder icon fallback
      totalSold: 210,
      totalRevenue: 10290.0,
    },
    {
      productId: 105,
      productName: 'Premium Leather Desk Pad Large',
      pictureUrl:
        'https://i.etsystatic.com/21197486/r/il/6ba5c9/6415924726/il_fullxfull.6415924726_gl75.jpg',
      totalSold: 115,
      totalRevenue: 4485.0,
    },
  ];
  viewProduct(ProductId: number) {
    console.log(ProductId);
  }
}
