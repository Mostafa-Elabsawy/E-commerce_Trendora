import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ProductAdmin,
  AllProductsAdmin,
  ProductFilterParams,
  CreateProduct,
  UpdateProduct,
} from '../../models/Admin/products-admin.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsAdminService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiURL}Products`;
  

  getAllProductsAdmin(params: ProductFilterParams): Observable<AllProductsAdmin> {
    let httpParams = new HttpParams();
    for (let [key, value] of Object.entries(params)) {
      if (value) {
        httpParams = httpParams.set(key, value.toString());
      }
    }
    return this.http.get<AllProductsAdmin>(`${this.apiUrl}`, { params: httpParams });
  }
  getProductById(id: number): Observable<ProductAdmin> {
    return this.http.get<ProductAdmin>(`${this.apiUrl}/${id}`);
  }
  createProduct(product: CreateProduct): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, product);
  }
  updateProduct(id: number, product: UpdateProduct): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
