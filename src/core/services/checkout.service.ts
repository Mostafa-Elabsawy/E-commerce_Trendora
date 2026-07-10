import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
    private url = environment.apiURL + 'Orders';
  constructor(private http: HttpClient) { }

  checkOut(order: any) {
    return this.http.post<any>(this.url, order);
  }
}
