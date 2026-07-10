import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Category } from '../models/category.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = environment.apiURL + 'Categories';
  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<any[]>(this.url).pipe(
      map((res: any) => {
        const data = res.Data ?? res.data ?? res;
        return data.map(
          (cat: any) =>
          (
            {
              id: cat.id ?? cat.Id,
              name: cat.name ?? cat.Name,
              description: cat.description ?? cat.Description,
              subCategories: cat.subCategories ?? cat.SubCategories
            }
          )

        )
      }
      )

    )
  }
}
