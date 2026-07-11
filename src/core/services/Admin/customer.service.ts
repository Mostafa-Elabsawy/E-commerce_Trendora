import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import {
    CustomerDTO,
    CustomerStatsDTO,
    OrderToReturnDTO,
} from '../../models/Admin/customers.interface';
import { CreateCustomerRequest } from '../../models/Admin/customers.interface';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    private readonly http = inject(HttpClient);

    private readonly baseUrl = `${environment.apiURL}Customers`;

    getCustomers(): Observable<CustomerDTO[]> {
        return this.http.get<CustomerDTO[]>(this.baseUrl);
    }
    getCustomer(id: string): Observable<CustomerDTO> {
        return this.http.get<CustomerDTO>(`${this.baseUrl}/${id}`);
    }

    getCustomerOrders(id: string): Observable<OrderToReturnDTO[]> {
        return this.http.get<OrderToReturnDTO[]>(`${this.baseUrl}/${id}/orders`);
    }

    getCustomerStats(id: string): Observable<CustomerStatsDTO> {
        return this.http.get<CustomerStatsDTO>(`${this.baseUrl}/${id}/stats`);
    }

    deleteCustomer(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    createCustomer(data: CreateCustomerRequest): Observable<any> {
        return this.http.post<any>(`${environment.apiURL}Authentication/register`, data);
    }
}
