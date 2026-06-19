import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { SubCategory } from '../models/subCategory.interface';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  private url = environment.apiURL + 'Types';
  constructor(private http: HttpClient) {
    
  }

  getAllSubCategories() {
    return this.http.get<SubCategory>(this.url);
  }
}
