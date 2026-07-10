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
}
