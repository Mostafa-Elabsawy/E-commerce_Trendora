import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  ProductAdmin,
  ProductFilterParams,
} from '../../../../core/models/Admin/products-admin.interface';
import { ProductsAdminService } from '../../../../core/services/Admin/products-admin.service';
import { TypesService } from '../../../../core/services/types.service';
import { ProductAdminFilterComponent } from '../product-admin-filter/product-admin-filter.component';
import { CreateProdcutComponent } from '../create-prodcut/create-prodcut.component';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductAdminFilterComponent,
    CreateProdcutComponent,
  ],
  templateUrl: './products-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllProductsAdminComponent implements OnInit {
  private productsAdminService = inject(ProductsAdminService);
  TypesService = inject(TypesService);
  router = inject(Router);

  // ---------------- STATE ----------------
  readonly products = signal<ProductAdmin[]>([]);
  readonly loading = signal(false);

  // ---------------- FILTERS ----------------
  readonly filters = signal<ProductFilterParams>({
    pageNumber: 1,
    pageSize: 20,
  });

  // ---------------- MODAL STATE ----------------
  createProduct = signal(false);
  dialogState = signal(false);
  selectedProduct = signal<ProductAdmin | null>(null);

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading.set(true);
    this.productsAdminService.getAllProductsAdmin(this.filters()).subscribe({
      next: (result) => {
        this.products.set(result.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.loading.set(false);
      },
    });
  }

  closeCreateModal() {
    this.createProduct.set(false);
  }

  openCreateModal() {
    this.createProduct.set(true);
  }

  stockDotClass(stock: number): string {
    if (stock === 0) return 'bg-rose-500';
    if (stock <= 10) return 'bg-amber-500';
    return 'bg-emerald-500';
  }

  stockTextClass(stock: number): string {
    if (stock === 0) return 'text-rose-600 font-semibold';
    if (stock <= 10) return 'text-amber-600';
    return 'text-slate-700';
  }

  openViewDialog(product: ProductAdmin): void {
    this.selectedProduct.set(product);
    this.dialogState.set(true);
  }

  openEditModal() {
    this.dialogState.set(false);
    const id = this.selectedProduct()?.id;
    if (id) {
      this.router.navigate(['/admin/products/edit', id]);
    }
  }

  closeModal() {
    this.dialogState.set(false);
  }

  deleteProduct(id: number | undefined) {
    if (!id) return;
    this.productsAdminService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
        this.closeModal();
      },
      error: (err) => console.error('Error deleting product:', err),
    });
  }

  clearFilters() {
    this.filters.set({ pageNumber: 1, pageSize: 20 });
    this.loadProducts();
  }
}
