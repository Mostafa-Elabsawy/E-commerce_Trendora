import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsAdmin } from '../../../../core/models/Admin/products-admin.interface';

export interface LookupItem {
  id: number;
  name: string;
}
@Component({
  selector: 'app-edit-add-product',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-add-product.component.html',
  styleUrl: './edit-add-product.component.css',
})
export class EditAddProductAdminComponent {
  private route = inject(ActivatedRoute);
  mode: 'edit' | 'add' = 'add';
  productId: number | null = null;

  // ================= LOOKUPS =================
  categorys = signal<LookupItem[]>([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Fashion' },
    { id: 3, name: 'Home & Living' },
  ]);

  types = signal<LookupItem[]>([
    { id: 1, name: 'New Arrival' },
    { id: 2, name: 'Featured' },
    { id: 3, name: 'Best Seller' },
  ]);

  brands = signal<LookupItem[]>([
    { id: 1, name: 'Nike' },
    { id: 2, name: 'Adidas' },
    { id: 3, name: 'Apple' },
  ]);

  // ================= FORM =================
  name = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  description = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  price = new FormControl<number | null>(null, [Validators.required]);

  stockQuantity = new FormControl<number | null>(null, [Validators.required]);

  pictureUrl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  categoryId = new FormControl<number | null>(null, [Validators.required]);

  typeId = new FormControl<number | null>(null, [Validators.required]);

  brandId = new FormControl<number | null>(null, [Validators.required]);

  discount = new FormControl<number | null>(0);

  addForm = new FormGroup({
    name: this.name,
    description: this.description,
    price: this.price,
    stockQuantity: this.stockQuantity,
    pictureUrl: this.pictureUrl,
    categoryId: this.categoryId,
    typeId: this.typeId,
    brandId: this.brandId,
    discount: this.discount,
  });

  // ================= INIT =================
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (!id || id === 'add') {
        this.mode = 'add';
        this.addForm.reset();
      } else {
        this.mode = 'edit';
        this.productId = +id;
        this.loadProduct(this.productId);
      }
    });

    this.categoryId.valueChanges.subscribe(() => {
      this.brandId.reset();
      this.typeId.reset();
    });
    this.addForm.valueChanges.subscribe((data) => console.log(data));
  }

  // ================= LOAD PRODUCT =================
  private loadProduct(id: number) {
    const product: ProductsAdmin = {
      id,
      name: 'Nike Air Zoom Pegasus',
      description: 'Running shoes with premium cushioning',
      price: 120,
      stockQuantity: 10,
      pictureUrl: 'https://example.com/image.jpg',
      categoryId: 1,
      typeId: 2,
      brandId: 1,
      discount: 10,
    };

    this.addForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      pictureUrl: product.pictureUrl,
      categoryId: product.categoryId,
      typeId: product.typeId,
      brandId: product.brandId,
      discount: product.discount,
    });
  }

  // ================= BUSINESS =================
  calculateFinalPrice(): number {
    const price = this.price.value || 0;
    const discount = this.discount.value || 0;
    return price - price * (discount / 100);
  }

  Submit() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    if (this.mode === 'add') {
      console.log('CREATE', this.addForm.value);
    } else {
      console.log('UPDATE', this.productId, this.addForm.value);
    }
  }
}
