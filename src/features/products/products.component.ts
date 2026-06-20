import { Component, OnInit, signal, computed } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService, ProductQueryParams } from '../../core/services/product.service';
import { IProduct } from '../../core/models/product.interface';
import { CategoryService } from '../../core/services/category.service';
import { SubCategoryService } from '../../core/services/sub-category.service';
import { BrandService } from '../../core/services/brand.service';
import { Category } from '../../core/models/category.interface';
import { SubCategory } from '../../core/models/subCategory.interface';
import { Brand } from '../../core/models/brand.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [TitleComponent, ProductCardComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(
    private _products: ProductService,
    private _categories: CategoryService,
    private _subCategories: SubCategoryService,
    private _brands: BrandService,
  ) {}

  allProducts = signal<IProduct[]>([]);
  categories = signal<Category[]>([]);
  subCategories = signal<SubCategory[]>([]);
  brands = signal<Brand[]>([]);
  totalCount = signal<number>(0);

  // Filter state
  selectedCategoryId: number | null = null;
  selectedBrandId: number | null = null;
  selectedSubCategoryId: number | null = null;
  selectedSort: string = '';
  selectedPriceRange: string = '';
  pageSize: number = 100; // Increase page size to fetch all products for accurate client-side pricing

  // Computed signal for client-side price filtering
  filteredProducts = computed(() => {
    let list = this.allProducts();

    if (this.selectedPriceRange) {
      if (this.selectedPriceRange === 'under-250') {
        list = list.filter((p) => p.Price < 250);
      } else if (this.selectedPriceRange === '250-500') {
        list = list.filter((p) => p.Price >= 250 && p.Price <= 500);
      } else if (this.selectedPriceRange === '500-1000') {
        list = list.filter((p) => p.Price >= 500 && p.Price <= 1000);
      } else if (this.selectedPriceRange === '1000-5000') {
        list = list.filter((p) => p.Price >= 1000 && p.Price <= 5000);
      } else if (this.selectedPriceRange === 'over-5000') {
        list = list.filter((p) => p.Price > 5000);
      }
    }

    return list;
  });

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubCategories();
    this.loadBrands();
    this.loadProducts();
  }

  loadProducts() {
    const params: ProductQueryParams = {
      pageSize: this.pageSize,
    };
    if (this.selectedCategoryId) params.categoryId = this.selectedCategoryId;
    if (this.selectedBrandId) params.brandId = this.selectedBrandId;
    if (this.selectedSubCategoryId) params.subCategoryId = this.selectedSubCategoryId;
    if (this.selectedSort) params.sort = this.selectedSort;

    this._products.getAllProducts(params).subscribe({
      next: (res: any) => {
        this.allProducts.set(res.Data ?? res.data ?? []);
        this.totalCount.set(res.Count ?? res.count ?? 0);
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      },
    });
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
    this._subCategories.getAllSubCategories().subscribe({
      next: (res: any) => {
        this.subCategories.set(res);
      },
      error: (err) => {
        console.error('Failed to load subcategories:', err);
      },
    });
  }

  loadBrands() {
    this._brands.getAllBrands().subscribe({
      next: (res: any) => {
        this.brands.set(res);
      },
      error: (err) => {
        console.error('Failed to load brands:', err);
      },
    });
  }

  onFilterChange() {
    this.loadProducts();
  }

  clearFilters() {
    this.selectedCategoryId = null;
    this.selectedBrandId = null;
    this.selectedSubCategoryId = null;
    this.selectedSort = '';
    this.selectedPriceRange = '';
    this.loadProducts();
  }
}
