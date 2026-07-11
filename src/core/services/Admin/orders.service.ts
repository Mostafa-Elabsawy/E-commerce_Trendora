import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { OrderToReturnDTO, OrderStatus } from '../../models/Admin/order.interface';

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    private readonly http = inject(HttpClient);

    private readonly baseUrl = `${environment.apiURL}Orders`;
    getAllOrders(): Observable<OrderToReturnDTO[]> {
        return this.http.get<OrderToReturnDTO[]>(`${this.baseUrl}/all`);
    }
    updateOrderStatus(orderId: string, status: OrderStatus): Observable<OrderToReturnDTO> {
        return this.http.patch<OrderToReturnDTO>(`${this.baseUrl}/${orderId}/status`, { status });
    }
    getOrderById(orderId: string): Observable<OrderToReturnDTO> {
  return this.http.get<OrderToReturnDTO>(
    `${this.baseUrl}/${orderId}`
  );
}
}
