import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { ProductsAdmin } from '../../../../core/models/Admin/products-admin.interface';
import { ProductAdminFilterComponent } from '../product-admin-filter/product-admin-filter.component';
import { CreateProdcutComponent } from '../create-prodcut/create-prodcut.component';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ProductAdminFilterComponent,
    CreateProdcutComponent,
  ],
  templateUrl: './products-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllProductsAdminComponent {
  // ---------------- STATE ----------------
  createProduct = signal<boolean>(false);
  closeCreateModal() {
    this.createProduct.set(false);
  }
  openCreateModal() {
    this.createProduct.set(true);
  }
  router = inject(Router);
  readonly products = signal<ProductsAdmin[]>([
    {
      id: 1001,
      name: 'Oversized Silk Shirt',
      categoryId: 1,
      typeId: 2,
      brandId: 1,
      price: 120,
      stockQuantity: 45,
      pictureUrl: '',
      discount: 10,
      description: 'Premium silk oversized shirt with modern fit.',
    },
    {
      id: 1002,
      name: 'Velvet Blazer',
      categoryId: 1,
      typeId: 2,
      brandId: 1,
      price: 299,
      stockQuantity: 3,
      discount: 15,
      pictureUrl: '',
      description: 'Luxury velvet blazer perfect for formal events.',
    },
    {
      id: 1003,
      name: 'Leather Tote',
      categoryId: 2,
      typeId: 3,
      brandId: 1,
      price: 450,
      stockQuantity: 0,
      discount: 20,
      pictureUrl: '',
      description: 'High-quality leather tote bag with premium finish.',
    },
  ]);

  readonly categories = ['Apparel', 'Accessories', 'Footwear'] as const;

  // ---------------- MODAL STATE ----------------

  selectedProduct = signal<ProductsAdmin>({
    id: 1001,
    name: 'Oversized Silk Shirt',
    categoryId: 1,
    typeId: 2,
    brandId: 3,
    price: 120,
    stockQuantity: 45,
    pictureUrl: '',
    discount: 10,
    description: 'Premium silk oversized shirt with modern fit.',
  });
  // ---------------- FILTERS ----------------

  constructor() {
    //   this.filterForm.valueChanges
    //     .pipe(debounceTime(250), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
    //     .subscribe(() => {
    //       this.filters.set(this.filterForm.getRawValue());
    //     });
    // }
    // ---------------- COMPUTED ----------------
    // ---------------- MODAL ACTIONS ----------------
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
  dialogState = signal(false);
  openViewDialog(product: ProductsAdmin): void {
    this.selectedProduct.set(product);
    this.dialogState.set(true);
  }

  openEditModal() {
    this.dialogState.set(false);
    this.router.navigate(['/admin/products/456']);
  }

  closeModal() {
    this.dialogState.set(false);
  }

  deleteProduct(id: number | undefined) {
    if (id) {
      /*delete service call*/
    }
  }

  clearFilters() {}
}
