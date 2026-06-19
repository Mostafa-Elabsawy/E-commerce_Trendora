import { Component, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.interface';
import { SubCategory } from '../../../core/models/subCategory.interface';
import { SubCategoryService } from '../../../core/services/sub-category.service';

@Component({
  selector: 'app-mega-menu',
  imports: [],
  templateUrl: './mega-menu.component.html',
  styleUrl: './mega-menu.component.css',
})
export class MegaMenuComponent implements OnInit {
  constructor(
    private _categories: CategoryService,
    private _subCategory: SubCategoryService,
  ) { }
  categories = signal<Category[]>([]);
  subCategories = signal<SubCategory[]>([]);
  ngOnInit(): void {
    this.loadCategories();
    this.loadSubCategories();
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
}
