import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { TitleComponent } from "../title/title.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/models/product.interface';

@Component({
  selector: 'app-related-products',
  imports: [TitleComponent, ProductCardComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
})
export class RelatedProductsComponent implements OnChanges {
  @Input() categoryId: number = 0;
  @Input() excludeProductId: number | null = null;
  constructor(private _products: ProductService) { }
  products = signal<IProduct[]>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['categoryId'] || changes['excludeProductId']) && this.categoryId) {
      this.loadProductsrelatedCategory();
    }
  }

  loadProductsrelatedCategory() {
    this._products.getAllProducts({ categoryId: this.categoryId, pageSize: 11 }).subscribe({
      next: (res: any) => {
        let list = res.Data ?? res.data ?? [];
        if (this.excludeProductId) {
          list = list.filter((p: IProduct) => p.Id !== this.excludeProductId);
        }
        this.products.set(list.slice(0, 10));
      },
      error: (err) => {
        console.error('Failed to load related products:', err);
      },
    });
  }
}
