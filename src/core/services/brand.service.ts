import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Brand } from '../models/brand.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private url = environment.apiURL + 'Brands';
  constructor(private http: HttpClient) {}

  getAllBrands() {
    return this.http.get<any[]>(this.url).pipe(
      map((res) =>
        res.map(
          (brand) =>
            ({
              Id: brand.Id ?? brand.id,
              Name: brand.Name ?? brand.name,
            } as Brand)
        )
      )
    );
  }
}
