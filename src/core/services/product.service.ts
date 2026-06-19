import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private url = environment.apiURL + 'Products';

  getAllProducts() {
    return this.http.get<IProduct>(this.url);
  }
  grtProductById(id: string) {
    return this.http.get<IProduct>(this.url + '/' + id);
  }
}
