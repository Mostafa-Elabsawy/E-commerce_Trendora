import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, SubCategory } from '../../../core/models/types.interface';
import { TypesService } from '../../../core/services/types.service';
interface LookupItem {
    id: number;
    name: string;
}
@Component({
    selector: 'app-edit-product',
    standalone: true,
    imports: [ReactiveFormsModule, CurrencyPipe],
    templateUrl: './edit-product.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent {
    TypesService = inject(TypesService);

    Categorys = signal<Category[]>([]);
    SubCategories = signal<SubCategory[]>([]);
    Brands = signal<string[]>([]);

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
    ngOnChanges(): void {
        // Replace with API call
        const product = {
            id,
            name: 'Adidas Adjustable Dumbbell Set',
            description: 'Adjustable dumbbell set ideal for home workouts.',
            pictureUrl:
                'https://ahmedkhalid25-001-site1.etempurl.com//Images/Products/AdidasDumbbellSet.jpg',
            price: 1899,
            discount: 0,
            stockQuantity: 50,
            productBrand: 'Adidas',
            categoryName: 'Sports & Outdoors',
            subCategory: 'Fitness Equipment',
        };

        this.editForm.patchValue(product);
        this.imagePreview.set(product.pictureUrl);

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

        console.log(this.editForm.getRawValue());

        // this.productsService.updateProduct(id, dto).subscribe(...)
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
