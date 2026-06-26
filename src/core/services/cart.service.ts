import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private url = environment.apiURL + 'Baskets';
  constructor(private http: HttpClient) { }

  getAllCarts() {
    return this.http.get(this.url);
  }


}
