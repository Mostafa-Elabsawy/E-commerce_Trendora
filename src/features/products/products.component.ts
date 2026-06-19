import { Component, OnInit, signal } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/models/product.interface';

@Component({
  selector: 'app-products',
  imports: [TitleComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(private _products: ProductService) { }
  products = signal<IProduct[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this._products.getAllProducts().subscribe({
      next: (res: any) => {
        this.products.set(res.data);
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      },
    });
  }
}
