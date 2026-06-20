import { Component, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.interface';
import { SubCategory } from '../../../core/models/subCategory.interface';
import { SubCategoryService } from '../../../core/services/sub-category.service';
import { ProductService } from '../../../core/services/product.service';
import { IProduct } from '../../../core/models/product.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mega-menu',
  imports: [RouterLink],
  templateUrl: './mega-menu.component.html',
  styleUrl: './mega-menu.component.css',
})
export class MegaMenuComponent implements OnInit {
  constructor(
    private _categories: CategoryService,
    private _subCategory: SubCategoryService,
    private _products: ProductService,
  ) {}

  categories = signal<Category[]>([]);
  subCategories = signal<SubCategory[]>([]);
  products = signal<IProduct[]>([]);

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubCategories();
    this.loadProducts();
  }

  loadCategories() {
    this._categories.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories.set(res);
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      },
    });
  }

  loadSubCategories() {
    this._subCategory.getAllSubCategories().subscribe({
      next: (res: any) => {
        this.subCategories.set(res);
      },
      error: (err) => {
        console.error('Failed to load subcategories:', err);
      },
    });
  }

  loadProducts() {
    this._products.getAllProducts({ pageSize: 100 }).subscribe({
      next: (res: any) => {
        this.products.set(res.Data ?? res.data ?? []);
      },
      error: (err) => {
        console.error('Failed to load products for mega menu:', err);
      },
    });
  }

  getProductsBySubCategory(subCategoryName: string): IProduct[] {
    return this.products()
      .filter((p) => p.SubCategory === subCategoryName)
      .slice(0, 10);
  }
}
