import {
    ChangeDetectionStrategy,
    Component,
    computed,
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
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-products-admin',
    standalone: true,
    imports: [CommonModule, RouterLink, ProductAdminFilterComponent, CreateProdcutComponent],
    templateUrl: './products-admin.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllProductsAdminComponent implements OnInit {
    private productsAdminService = inject(ProductsAdminService);
    TypesService = inject(TypesService);
    router = inject(Router);
    private toastr = inject(ToastrService);

    // ---------------- STATE ----------------
    products = signal<ProductAdmin[]>([]);
    totalCount = signal(0);
    pageSize = signal(10);
    currentPage = signal(1);
    totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));
    startIndex = computed(() => (this.currentPage() - 1) * this.pageSize() + 1);
    endIndex = computed(() => Math.min(this.currentPage() * this.pageSize(), this.totalCount()));

    // ---------------- FILTERS ----------------
    filters = signal<ProductFilterParams>({
        pageNumber: 1,
        pageSize: 10,
    });

    // ---------------- MODAL STATE ----------------
    createProduct = signal(false);


    ngOnInit(): void {
        this.loadProducts();
    }

    private loadProducts(): void {
        this.productsAdminService.getAllProductsAdmin(this.filters()).subscribe({
            next: (result) => {
                this.products.set(result.data);
                this.totalCount.set(result.count);
                this.pageSize.set(result.pageSize);
                this.currentPage.set(result.pageIndex);
            },
            error: (err) => {
                console.error('Error loading products:', err);
                this.toastr.error('Failed to load products');
            },
        });
    }

    goToPage(page: number) {
        if (page < 1 || page > this.totalPages()) return;
        this.filters.set({ ...this.filters(), pageNumber: page });
        this.loadProducts();
    }

    nextPage() {
        this.goToPage(this.currentPage() + 1);
    }
    prevPage() {
        this.goToPage(this.currentPage() - 1);
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

    onFilterChange(filters: ProductFilterParams) {
        this.filters.set({ ...this.filters(), ...filters, pageNumber: 1 });
        this.loadProducts();
    }

    clearFilters() {
        this.filters.set({ pageNumber: 1, pageSize: 20 });
        this.loadProducts();
    }
    deleteProduct(id:number)
    {
        if (!confirm('Are you sure you want to delete this product?')) return;

        this.productsAdminService.deleteProduct(id).subscribe({
            next: () => {
                this.toastr.success('Product deleted successfully');
                this.loadProducts();
            },
            error: (err) => {
                console.error('Error deleting product:', err);
                this.toastr.error('Failed to delete product');
            },
        });

    }
}
