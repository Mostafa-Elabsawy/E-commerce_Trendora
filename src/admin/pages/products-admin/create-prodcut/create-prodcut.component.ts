import { Component, computed, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TypesService } from '../../../../core/services/types.service';
import { ProductsAdminService } from '../../../../core/services/Admin/products-admin.service';
import { CreateProduct } from '../../../../core/models/Admin/products-admin.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-prodcut',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-prodcut.component.html',
  styleUrl: './create-prodcut.component.css',
})
export class CreateProdcutComponent {
  private typesService = inject(TypesService);
  private productsAdminService = inject(ProductsAdminService);
  private toastr = inject(ToastrService);

  state = input<boolean>(false);
  stateChange = output<boolean>();

  readonly brands = computed(() => this.typesService.brands());
  readonly categories = computed(() => this.typesService.categorys());
  categoryIdValue = signal<number | null>(null);
  readonly filteredSubCategories = computed(() => {
    const catId = this.categoryIdValue();
    if (!catId) return [];
    const cat = this.categories().find((c) => c.id === catId);
    return cat?.subCategories ?? [];
  });

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

  brandId = new FormControl<number | null>(null, { validators: [Validators.required] });
  categoryId = new FormControl<number | null>(null, { validators: [Validators.required] });
  subCategoryId = new FormControl<number | null>(null, { validators: [Validators.required] });

  createForm = new FormGroup({
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

  constructor() {
    this.categoryId.valueChanges.subscribe((id) => this.categoryIdValue.set(id));

    this.pictureUrl.valueChanges.subscribe((url) => {
      this.imagePreview.set(url);
    });
  }

  onCategoryChange() {
    this.subCategoryId.setValue(null);
  }

  closeModal() {
    this.stateChange.emit(false);
  }

  save() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const formValue = this.createForm.getRawValue();

    const dto: CreateProduct = {
      name: formValue.name,
      description: formValue.description,
      pictureUrl: formValue.pictureUrl,
      price: formValue.price,
      discount: formValue.discount,
      stockQuantity: formValue.stockQuantity,
      brandId: formValue.brandId ?? 0,
      subCategoryId: formValue.subCategoryId ?? 0,
    };

    this.productsAdminService.createProduct(dto).subscribe({
      next: () => {
        this.toastr.success('Product created successfully');
        this.saving.set(false);
        this.closeModal();
      },
      error: (err) => {
        console.error('Error creating product:', err);
        this.toastr.error('Failed to create product');
        this.saving.set(false);
      },
    });
  }
}
