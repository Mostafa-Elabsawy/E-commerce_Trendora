import { Component, Signal } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/models/product.interface';
import { RelatedProductsComponent } from "../related-products/related-products.component";

@Component({
  selector: 'app-prosuct-details',
  imports: [RelatedProductsComponent],
  templateUrl: './prosuct-details.component.html',
  styleUrl: './prosuct-details.component.css',
})
export class ProsuctDetailsComponent {
  constructor(
    private _activedRoute: ActivatedRoute,
    private _productService: ProductService,
  ) { }
  id!: string;
  product!: IProduct;

  loadProductDetails(id: string) {
    this._productService.grtProductById(id).subscribe({
      next: (res: any) => {
        this.product = res;
        console.log(this.product);
      },
      error: (err) => {
        console.error('Failed to load product details:', err);
      },
    });
  }

  ngOnInit(): void {
    this._activedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id')!;
      this.loadProductDetails(this.id);
    });
  }
}
