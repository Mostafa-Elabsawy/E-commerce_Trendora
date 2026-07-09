import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
export type ProductSort = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

@Component({
  selector: 'app-product-admin-filter',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-admin-filter.component.html',
  styleUrl: './product-admin-filter.component.css',
})
export class ProductAdminFilterComponent {
  search = new FormControl<string>('', { nonNullable: true });
  category = new FormControl<string>('', { nonNullable: true });
  sortBy = new FormControl<ProductSort>('name-asc', { nonNullable: true });
  filterForm= new FormGroup({
    search: this.search,
    category: this.category,
    sortBy: this.sortBy,
  });
  readonly categories = ['Apparel', 'Accessories', 'Footwear'];
  clearFilters() {
    this.filterForm.reset({
      search: '',
      category: '',
      sortBy: 'name-asc',
    });
  }

}
