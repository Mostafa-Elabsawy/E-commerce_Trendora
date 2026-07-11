import { CommonModule } from '@angular/common';
import { Component, computed, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TypesService } from '../../../../core/services/types.service';
import { ProductFilterParams } from '../../../../core/models/Admin/products-admin.interface';

@Component({
  selector: 'app-product-admin-filter',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-admin-filter.component.html',
  styleUrl: './product-admin-filter.component.css',
})
export class ProductAdminFilterComponent {
  private typesService = inject(TypesService);

  readonly categories = computed(() => this.typesService.categorys());
  readonly brands = computed(() => this.typesService.brands());
  categoryIdValue = signal<number | null>(null);
  readonly filteredSubCategories = computed(() => {
    const catId = this.categoryIdValue();
    if (!catId) return [];
    const cat = this.categories().find((c) => c.id === catId);
    return cat?.subCategories ?? [];
  });

  readonly filterChange = output<ProductFilterParams>();

  constructor() {
    this.categoryId.valueChanges.subscribe((id) => this.categoryIdValue.set(id));
  }

  search = new FormControl<string>('', { nonNullable: true });
  categoryId = new FormControl<number | null>(null);
  brandId = new FormControl<number | null>(null);
  subCategoryId = new FormControl<number | null>(null);
  sort = new FormControl<string | null>(null, { nonNullable: true });

  filterForm = new FormGroup({
    search: this.search,
    categoryId: this.categoryId,
    brandId: this.brandId,
    subCategoryId: this.subCategoryId,
    sort: this.sort,
  });

  applyFilters() {
    const params: ProductFilterParams = {
      search: this.search.value || undefined,
      sort: this.sort.value || undefined,
      categoryId: this.categoryId.value ?? undefined,
      brandId: this.brandId.value ?? undefined,
      subCategoryId: this.subCategoryId.value ?? undefined,
    };
    this.filterChange.emit(params);
  }

  clearFilters() {
    this.filterForm.reset({
      search: '',
      categoryId: null,
      brandId: null,
      subCategoryId: null,
      sort: 'name-asc',
    });
    this.applyFilters();
  }
}
