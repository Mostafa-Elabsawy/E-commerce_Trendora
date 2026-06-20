import { Component, OnInit, signal } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { IProduct } from '../../core/models/product.interface';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-best-sellers',
  imports: [TitleComponent, ProductCardComponent],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css',
})
export class BestSellersComponent implements OnInit {
  constructor(private _products: ProductService) { }
  products = signal<IProduct[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this._products.getAllProducts().subscribe({
      next: (res: any) => {
        this.products.set(res.Data ?? res.data ?? []);
      },
      error: (err) => {
        console.error('Failed to load best sellers products:', err);
      },
    });
  }
}
