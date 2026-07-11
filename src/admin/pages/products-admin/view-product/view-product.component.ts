import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductsAdminService } from '../../../../core/services/Admin/products-admin.service';
import { ProductAdmin } from '../../../../core/models/Admin/products-admin.interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './view-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewProductComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productsAdminService = inject(ProductsAdminService);

  readonly loading = signal(true);
  readonly product = signal<ProductAdmin | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/admin/products']);
      return;
    }

    this.productsAdminService.getProductById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.loading.set(false);
      },
    });
  }

  get finalPrice(): number {
    const product = this.product();
    if (!product) return 0;
    return product.price - (product.price * product.discount) / 100;
  }

  editProduct(): void {
    this.router.navigate(['/admin/products/edit', this.product()?.id]);
  }

  deleteProduct(): void {
    const product = this.product();
    if (!product) return;

    const confirmed = confirm(`Delete "${product.name}"?`);
    if (!confirmed) return;

    this.productsAdminService.deleteProduct(product.id).subscribe({
      next: () => {
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/products']);
  }
}
