import { inject, Injectable, signal } from '@angular/core';
import { Brand, Category, SubCategory } from '../models/types.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class TypesService {
  http = inject(HttpClient);
  private categorysUrl = `${environment.apiURL}Categories`;
  private brandsUrl = `${environment.apiURL}Brands`;
  readonly categorys = signal<Category[]>([]);
  readonly brands = signal<Brand[]>([]);
  loadCategorys() {
    this.http.get<Category[]>(this.categorysUrl).subscribe({
      next: (data) => {
        this.categorys.set(data);
      },
      error: (error) => {
        console.error('Error fetching categorys:', error);
      },
    });
  }
  loadBrands() {
    this.http.get<Brand[]>(this.brandsUrl).subscribe({
      next: (data) => {
        this.brands.set(data);
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
      },
    });
  }
  constructor() {
    this.loadCategorys();
    this.loadBrands();
  }

  // ── Brand lookups ──
  getBrandIdByName(name: string): number | undefined {
    return this.brands().find((b) => b.name === name)?.id;
  }
  getBrandNameById(id: number): string | undefined {
    return this.brands().find((b) => b.id === id)?.name;
  }

  // ── Category lookups ──
  getCategoryIdByName(name: string): number | undefined {
    return this.categorys().find((c) => c.name === name)?.id;
  }
  getCategoryNameById(id: number): string | undefined {
    return this.categorys().find((c) => c.id === id)?.name;
  }

  // ── SubCategory lookups ──
  getSubCategoryIdByName(categoryId: number, name: string): number | undefined {
    const cat = this.categorys().find((c) => c.id === categoryId);
    return cat?.subCategories.find((s) => s.name === name)?.id;
  }
  getSubCategoryNameById(id: number): string | undefined {
    for (const cat of this.categorys()) {
      const found = cat.subCategories.find((s) => s.id === id);
      if (found) return found.name;
    }
    return undefined;
  }
}
