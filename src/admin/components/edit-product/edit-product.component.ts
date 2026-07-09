import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../core/models/types.interface';
import { TypesService } from '../../../core/services/types.service';
import { ProductsAdminService } from '../../../core/services/Admin/products-admin.service';
import { UpdateProduct } from '../../../core/models/Admin/products-admin.interface';
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

    private productId = 0;

    loading = signal(false);
    saving = signal(false);

    imagePreview = signal('');
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

    productBrand = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
    });

    categoryName = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
    });

    subCategory = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
    });
    editForm = new FormGroup({
        name: this.name,
        description: this.description,
        pictureUrl: this.pictureUrl,
        price: this.price,
        discount: this.discount,
        stockQuantity: this.stockQuantity,
        productBrand: this.productBrand,
        categoryName: this.categoryName,
        subCategory: this.subCategory,
    });
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.productId = +params['id'];
            if (this.productId) {
                this.loading.set(true);
                this.productsAdminService.getProductById(this.productId).subscribe({
                    next: (product) => {
                        this.editForm.patchValue(product);
                        this.imagePreview.set(product.pictureUrl);
                        this.loading.set(false);
                    },
                    error: (err) => {
                        console.error('Error loading product:', err);
                        this.loading.set(false);
                    },
                });
            }
        });

        this.editForm.controls.pictureUrl.valueChanges.subscribe((url) => {
            this.imagePreview.set(url);
        });
    }

    save(): void {
        if (this.editForm.invalid) {
            this.editForm.markAllAsTouched();
            return;
        }

        this.saving.set(true);
        const formValue = this.editForm.getRawValue();

        const brand = this.TypesService.brands().find(
            (b) => b.name === formValue.productBrand
        );

        let subCategoryId = 0;
        for (const cat of this.TypesService.categorys()) {
            const sub = cat.subCategories.find(
                (s) => s.name === formValue.subCategory
            );
            if (sub) {
                subCategoryId = sub.id;
                break;
            }
        }

        const dto: UpdateProduct = {
            name: formValue.name,
            description: formValue.description,
            pictureUrl: formValue.pictureUrl,
            price: formValue.price,
            discount: formValue.discount,
            stockQuantity: formValue.stockQuantity,
            brandId: brand?.id ?? 0,
            subCategoryId,
        };

        this.productsAdminService.updateProduct(this.productId, dto).subscribe({
            next: () => {
                this.saving.set(false);
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: (err) => {
                console.error('Error updating product:', err);
                this.saving.set(false);
            },
        });
    }

    cancel(): void {
        this.router.navigate(['../'], {
            relativeTo: this.route,
        });
    }

    get finalPrice(): number {
        const price = this.editForm.controls.price.value;
        const discount = this.editForm.controls.discount.value;

        return price - (price * discount) / 100;
    }
}
