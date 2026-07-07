import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  price: number;
  discount: number;
  stockQuantity: number;
  inStock: boolean;
  productBrand: string;
  subCategory: string;
  categoryName: string;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './view-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewProductComponent  {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly loading = signal(true);

  readonly product = signal<ProductDetails>({
    id: 36,
    name: 'Adidas Adjustable Dumbbell Set',
    description:
      'Adjustable dumbbell set ideal for home workouts. Easily change the weight according to your training needs while saving space compared to traditional dumbbells.',
    pictureUrl:
      'https://ahmedkhalid25-001-site1.etempurl.com//Images/Products/AdidasDumbbellSet.jpg',
    price: 1899,
    discount: 0,
    stockQuantity: 50,
    inStock: true,
    productBrand: 'Adidas',
    subCategory: 'Fitness Equipment',
    categoryName: 'Sports & Outdoors',
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    console.log('Product Id:', id);

    // TODO:
    // this.productsService.getProduct(id).subscribe(...)
    // then:
    // this.product.set(response);
    // this.loading.set(false);

    this.loading.set(false);
  }

  get finalPrice(): number {
    const product = this.product();

    return product.price - (product.price * product.discount) / 100;
  }

  editProduct(): void {
    this.router.navigate(['/admin/products/edit', this.product().id]);
  }

  deleteProduct(): void {
    const confirmed = confirm(`Delete "${this.product().name}"?`);

    if (!confirmed) return;

    console.log('Delete Product', this.product().id);

    // TODO:
    // this.productsService.deleteProduct(this.product().id).subscribe(() => {
    //   this.router.navigate(['/admin/products']);
    // });
  }

  goBack(): void {
    this.router.navigate(['/admin/products']);
  }
}
