import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { SubCategory } from '../models/subCategory.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  private url = environment.apiURL + 'SubCategories';
  constructor(private http: HttpClient) {}

  getAllSubCategories() {
    return this.http.get<any[]>(this.url).pipe(
      map((res) =>
        res.map(
          (sub) =>
            ({
              Id: sub.Id ?? sub.id,
              Name: sub.Name ?? sub.name,
              CategoryId: sub.CategoryId ?? sub.categoryId,
            } as SubCategory)
        )
      )
    );
  }
}
