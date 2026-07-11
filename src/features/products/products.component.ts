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
  ) { }

  allProducts = signal<IProduct[]>([]);
  categories = signal<Category[]>([]);
  subCategories = signal<SubCategory[]>([]);
  brands = signal<Brand[]>([]);
  totalCount = signal<number>(0);
  selectedCategoryId: number | null = null;
  selectedBrandId: number | null = null;
  selectedSubCategoryId: number | null = null;
  selectedSort: string = '';
  selectedPriceRange: string = '';
  pageSize: number = 10;
  pageIndex: number = 1;
  searchQuery: string = '';

  protected readonly Math = Math;

  private readonly priceFilters: Record<string, (price: number) => boolean> = {
    'under-250': (p) => p < 250,
    '250-500': (p) => p >= 250 && p <= 500,
    '500-1000': (p) => p >= 500 && p <= 1000,
    '1000-5000': (p) => p >= 1000 && p <= 5000,
    'over-5000': (p) => p > 5000,
  };

  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize));
  totalPagesArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  filteredProducts = computed(() => {
    const list = this.allProducts();
    const filterFn = this.priceFilters[this.selectedPriceRange];
    return filterFn ? list.filter((p) => filterFn(p.price)) : list;
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
      pageIndex: this.pageIndex,
    };
    if (this.selectedCategoryId) params.categoryId = this.selectedCategoryId;
    if (this.selectedBrandId) params.brandId = this.selectedBrandId;
    if (this.selectedSubCategoryId) params.subCategoryId = this.selectedSubCategoryId;
    if (this.selectedSort) params.sort = this.selectedSort;
    if (this.searchQuery) params.search = this.searchQuery;

    this._products.getAllProducts(params).subscribe({
      next: (res: any) => {
        this.allProducts.set(res.data ?? []);
        this.totalCount.set(res.count ?? 0);
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
    this.pageIndex = 1;
    this.loadProducts();
  }

  onSearchChange() {
    this.pageIndex = 1;
    this.loadProducts();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageIndex = page;
      this.loadProducts();
    }
  }

  clearFilters() {
    this.selectedCategoryId = null;
    this.selectedBrandId = null;
    this.selectedSubCategoryId = null;
    this.selectedSort = '';
    this.selectedPriceRange = '';
    this.searchQuery = '';
    this.pageIndex = 1;
    this.loadProducts();
  }
}
