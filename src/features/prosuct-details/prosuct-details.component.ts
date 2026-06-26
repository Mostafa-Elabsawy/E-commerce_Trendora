import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { RelatedProductsComponent } from "../related-products/related-products.component";
import { AsyncPipe } from '@angular/common';
import { map, Observable, switchMap } from 'rxjs';
import { IProduct } from '../../core/models/product.interface';

@Component({
  selector: 'app-prosuct-details',
  imports: [RelatedProductsComponent, AsyncPipe],
  templateUrl: './prosuct-details.component.html',
  styleUrl: './prosuct-details.component.css',
})
export class ProsuctDetailsComponent {
  product$: Observable<IProduct>;

  constructor(
    private _activedRoute: ActivatedRoute,
    private _productService: ProductService,
  ) {
    this.product$ = this._activedRoute.paramMap.pipe(
      map((params) => params.get('id')!),
      switchMap((id) => this._productService.grtProductById(id))
    );
  }
}
