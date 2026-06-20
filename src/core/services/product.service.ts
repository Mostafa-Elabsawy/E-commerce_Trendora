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
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private url = environment.apiURL + 'Products';

  private normalizeProduct(p: any): IProduct {
    return {
      Id: p.Id ?? p.id,
      Name: p.Name ?? p.name,
      Description: p.Description ?? p.description,
      PictureUrl: p.PictureUrl ?? p.pictureUrl,
      Price: p.Price ?? p.price,
      Discount: p.Discount ?? p.discount,
      StockQuantity: p.StockQuantity ?? p.stockQuantity,
      InStock: p.InStock ?? p.inStock,
      ProductBrand: p.ProductBrand ?? p.productBrand ?? p.brand ?? '',
      SubCategory: p.SubCategory ?? p.subCategory ?? '',
      CategoryId: p.CategoryId ?? p.categoryId,
      CategoryName: p.CategoryName ?? p.categoryName ?? '',
    };
  }

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
        params = params.set('pageIndex', queryParams.pageIndex.toString());
      }
    }

    return this.http.get<any>(this.url, { params }).pipe(
      map((res) => {
        const data = res.Data ?? res.data ?? [];
        const normalizedData = data.map((p: any) => this.normalizeProduct(p));
        return {
          PageIndex: res.PageIndex ?? res.pageIndex ?? 1,
          PageSize: res.PageSize ?? res.pageSize ?? 10,
          Count: res.Count ?? res.count ?? 0,
          Data: normalizedData,
        } as IProductPaginationResponse;
      })
    );
  }

  grtProductById(id: string) {
    return this.http.get<any>(this.url + '/' + id).pipe(
      map((res) => this.normalizeProduct(res))
    );
  }
}
