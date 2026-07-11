import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IAddress } from '../models/userData.interface';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly url = environment.apiURL + 'Authentication';

  constructor(private _http: HttpClient) {}

  getCurrentUser(token: string) {
    return this._http.get<any>(`${this.url}/CurrentUser`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getAddress(token: string) {
    return this._http.get<IAddress>(`${this.url}/address`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateAddress(address: IAddress, token: string) {
    return this._http.put<IAddress>(`${this.url}/address`, address, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}