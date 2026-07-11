import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IProduct, IProductPaginationResponse } from '../models/product.interface';
import { map } from 'rxjs/operators';

export interface ProductQueryParams {
  sort?: string;
  categoryId?: number;
  brandId?: number;
  subCategoryId?: number;
  pageSize?: number;
  pageIndex?: number;
  search?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }
  private url = environment.apiURL + 'Products';

  getAllProducts(queryParams?: ProductQueryParams) {
    let params = new HttpParams();

    if (queryParams) {
      if (queryParams.sort) {
        params = params.set('sort', queryParams.sort);
      }
      if (queryParams.categoryId) {
        params = params.set('categoryId', queryParams.categoryId.toString());
      }
      if (queryParams.brandId) {
        params = params.set('brandId', queryParams.brandId.toString());
      }
      if (queryParams.subCategoryId) {
        params = params.set('subCategoryId', queryParams.subCategoryId.toString());
      }
      if (queryParams.pageSize) {
        params = params.set('pageSize', queryParams.pageSize.toString());
      }
      if (queryParams.pageIndex) {
        params = params.set('pageNumber', queryParams.pageIndex.toString());
      }
      if (queryParams.search) {
        params = params.set('search', queryParams.search);
      }
    }

    return this.http.get<any>(this.url, { params }).pipe(
      map((res) => {
        const data =  res.data ;
        return {
          pageIndex: res.pageIndex ?? 1,
          pageSize: res.pageSize ?? 10,
          count: res.count ?? 0,
          data: data,
        } as IProductPaginationResponse;
      })
    );
  }

  grtProductById(id: string) {
    return this.http.get<IProduct>(this.url + '/' + id);
  }
}
