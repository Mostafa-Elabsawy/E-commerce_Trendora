import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export type ProductSort =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './products-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsAdminComponent {

  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------

  readonly products = signal<Product[]>([
    {
      id: '1001',
      name: 'Oversized Silk Shirt',
      category: 'Apparel',
      subcategory: 'Shirts',
      price: 120,
      stock: 45
    },
    {
      id: '1002',
      name: 'Velvet Blazer',
      category: 'Apparel',
      subcategory: 'Outerwear',
      price: 299,
      stock: 3
    },
    {
      id: '1003',
      name: 'Leather Tote',
      category: 'Accessories',
      subcategory: 'Bags',
      price: 450,
      stock: 0
    }
  ]);

  readonly categories = [
    'Apparel',
    'Accessories',
    'Footwear'
  ] as const;

  readonly isModalOpen = signal(false);

  readonly selectedProduct =
    signal<Product | null>(null);

  // --------------------------------------------------------------------------
  // FILTER FORM
  // --------------------------------------------------------------------------

  readonly filterForm = this.fb.nonNullable.group({
    search: '',
    category: '',
    sortBy: 'name-asc' as ProductSort
  });

  readonly filters = signal({
    search: '',
    category: '',
    sortBy: 'name-asc' as ProductSort
  });

  constructor() {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.filters.set(this.filterForm.getRawValue());
      });
  }

  // --------------------------------------------------------------------------
  // COMPUTED DATA
  // --------------------------------------------------------------------------

  readonly filteredProducts = computed(() => {

    const criteria = this.filters();

    let data = [...this.products()];

    // Search

    if (criteria.search.trim()) {
      const query = criteria.search
        .toLowerCase()
        .trim();

      data = data.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.id.includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query)
      );
    }

    // Category

    if (criteria.category) {
      data = data.filter(
        product =>
          product.category === criteria.category
      );
    }

    // Sort

    switch (criteria.sortBy) {

      case 'name-desc':
        data.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      case 'price-asc':
        data.sort((a, b) =>
          a.price - b.price
        );
        break;

      case 'price-desc':
        data.sort((a, b) =>
          b.price - a.price
        );
        break;

      default:
        data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
    }

    return data;
  });

  // --------------------------------------------------------------------------
  // ACTIONS
  // --------------------------------------------------------------------------

  openAddModal(): void {
    this.selectedProduct.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(product: Product): void {
    this.selectedProduct.set(product);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedProduct.set(null);
  }

  addProduct(product: Product): void {
    this.products.update(products => [
      ...products,
      product
    ]);

    this.closeModal();
  }

  updateProduct(updatedProduct: Product): void {

    this.products.update(products =>
      products.map(product =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    );

    this.closeModal();
  }

  deleteProduct(id: string): void {

    const confirmed = confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmed) return;

    this.products.update(products =>
      products.filter(
        product => product.id !== id
      )
    );
  }

  clearFilters(): void {
    this.filterForm.reset({
      search: '',
      category: '',
      sortBy: 'name-asc'
    });
  }

  stockDotClass(stock: number): string {

    if (stock === 0) {
      return 'bg-rose-500';
    }

    if (stock <= 10) {
      return 'bg-amber-500';
    }

    return 'bg-emerald-500';
  }

  stockTextClass(stock: number): string {

    if (stock === 0) {
      return 'text-rose-600 font-semibold';
    }

    if (stock <= 10) {
      return 'text-amber-600';
    }

    return 'text-slate-700';
  }
  }
