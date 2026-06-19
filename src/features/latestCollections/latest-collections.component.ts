import { Component, OnInit, signal } from '@angular/core';
import { TitleComponent } from '../title/title.component';
// import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { IProduct } from '../../core/models/product.interface';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-latest-collections',
  imports: [TitleComponent, ProductCardComponent],
  templateUrl: './latest-collections.component.html',
  styleUrl: './latest-collections.component.css',
})
export class LatestCollectionsComponent implements OnInit {
  // products = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
        console.error('Failed to load latest collections products:', err);
      },
    });
  }
}
