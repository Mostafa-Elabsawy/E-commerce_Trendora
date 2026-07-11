import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly url = environment.apiURL + 'Orders';

  constructor(private _http: HttpClient) {}

  getUserOrders(token: string) {
    return this._http.get<any[]>(this.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}