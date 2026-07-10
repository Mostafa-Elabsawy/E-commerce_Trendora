import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    constructor(private http: HttpClient) { }

    private baseUrl = environment.apiURL + "Payments";

    createPaymentIntent(deliveryMethodId: number) {
        return this.http.post<any>(this.baseUrl, { deliveryMethodId });
    }
}
