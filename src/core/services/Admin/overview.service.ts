import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
    DashboardKPIs,
    DashboardRecentOrders,
    DashboardTopProducts,
} from '../../models/Admin/overview.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OverviewService {
    apiUrl = 'https://ahmedkhalid25-001-site1.etempurl.com/api/admin/dashboard';
    http = inject(HttpClient);
    getDashboardKPIs(): Observable<DashboardKPIs> {
        return this.http.get<DashboardKPIs>(`${this.apiUrl}/summary`);
    }
    getDashboardRecentOrders(): Observable<DashboardRecentOrders[]> {
        return this.http.get<DashboardRecentOrders[]>(`${this.apiUrl}/recent-orders?limit=10`);
    }
    getDashboardTopProducts(): Observable<DashboardTopProducts[]> {
        return this.http.get<DashboardTopProducts[]>(`${this.apiUrl}/top-products?limit=5`);
    }
}
