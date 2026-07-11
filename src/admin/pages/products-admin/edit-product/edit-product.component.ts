import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypesService } from '../../../../core/services/types.service';
import { ProductsAdminService } from '../../../../core/services/Admin/products-admin.service';
import { UpdateProduct } from '../../../../core/models/Admin/products-admin.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-edit-product',
    standalone: true,
    imports: [ReactiveFormsModule, CurrencyPipe],
    templateUrl: './edit-product.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent implements OnInit {
    TypesService = inject(TypesService);
    private productsAdminService = inject(ProductsAdminService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private toastr = inject(ToastrService);

    private productId = 0;

    loading = signal(false);
    saving = signal(false);

    imagePreview = signal('');

    readonly brands = computed(() => this.TypesService.brands());
    readonly categories = computed(() => this.TypesService.categorys());
    categoryIdValue = signal<number | null>(null);
    readonly filteredSubCategories = computed(() => {
        const catId = this.categoryIdValue();
        if (!catId) return [];
        const cat = this.categories().find((c) => c.id === catId);
        return cat?.subCategories ?? [];
    });

    name = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
    });

    description = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
    });

    pictureUrl = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
    });

    price = new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
    });

    discount = new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0), Validators.max(100)],
    });

    stockQuantity = new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
    });

    brandId = new FormControl<number | null>(null, { validators: [Validators.required] });
    categoryId = new FormControl<number | null>(null, { validators: [Validators.required] });
    subCategoryId = new FormControl<number | null>(null, { validators: [Validators.required] });

    editForm = new FormGroup({
        name: this.name,
        description: this.description,
        pictureUrl: this.pictureUrl,
        price: this.price,
        discount: this.discount,
        stockQuantity: this.stockQuantity,
        brandId: this.brandId,
        categoryId: this.categoryId,
        subCategoryId: this.subCategoryId,
    });

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.productId = +params['id'];
            if (this.productId) {
                this.loading.set(true);
                this.productsAdminService.getProductById(this.productId).subscribe({
                    next: (product) => {
                        this.editForm.patchValue({
                            name: product.name,
                            description: product.description,
                            pictureUrl: product.pictureUrl,
                            price: product.price,
                            discount: product.discount,
                            stockQuantity: product.stockQuantity,
                            categoryId: product.categoryId,
                            brandId: this.TypesService.getBrandIdByName(product.productBrand),
                            subCategoryId: this.TypesService.getSubCategoryIdByName(
                                product.categoryId,
                                product.subCategory
                            ),
                        });
                        this.imagePreview.set(product.pictureUrl);
                        this.loading.set(false);
                    },
                    error: (err) => {
                        console.error('Error loading product:', err);
                        this.toastr.error('Failed to load product details');
                        this.loading.set(false);
                    },
                });
            }
        });

        this.categoryId.valueChanges.subscribe((id) => this.categoryIdValue.set(id));

        this.editForm.controls.pictureUrl.valueChanges.subscribe((url) => {
            this.imagePreview.set(url);
        });
    }

    onCategoryChange() {
        this.subCategoryId.setValue(null);
    }

    save(): void {
        if (this.editForm.invalid) {
            this.editForm.markAllAsTouched();
            return;
        }

        this.saving.set(true);
        const formValue = this.editForm.getRawValue();

        const dto: UpdateProduct = {
            name: formValue.name,
            description: formValue.description,
            pictureUrl: formValue.pictureUrl,
            price: formValue.price,
            discount: formValue.discount,
            stockQuantity: formValue.stockQuantity,
            brandId: formValue.brandId ?? 0,
            subCategoryId: formValue.subCategoryId ?? 0,
        };

        this.productsAdminService.updateProduct(this.productId, dto).subscribe({
            next: () => {
                this.toastr.success('Product updated successfully');
                this.saving.set(false);
            },
            error: (err) => {
                console.error('Error updating product:', err);
                this.toastr.error('Failed to update product');
                this.saving.set(false);
            },
        });
    }

    cancel(): void {
        this.router.navigate(['../..'], { relativeTo: this.route });
    }

    get finalPrice(): number {
        const price = this.editForm.controls.price.value;
        const discount = this.editForm.controls.discount.value;

        return price - (price * discount) / 100;
    }
}
