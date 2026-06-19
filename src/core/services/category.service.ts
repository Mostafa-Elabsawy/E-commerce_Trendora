import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Category } from '../models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
    private url = environment.apiURL + 'Categories';
  constructor(private http:HttpClient){}


  getAllCategories(){
    return this.http.get<Category>(this.url)
  }
}
