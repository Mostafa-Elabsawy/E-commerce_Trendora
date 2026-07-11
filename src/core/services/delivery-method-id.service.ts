import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DeliveryMethodIdService {
  constructor(private http:HttpClient){}
  private url = environment.apiURL + 'Orders/DeliveryMethods';

  getDeliveryMethods(){
    return this.http.get<any>(this.url);
  }
  

}
