import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateProdcutComponent } from '../create-prodcut/create-prodcut.component';

@Component({
  selector: 'app-products-admin-main',
  imports: [ RouterOutlet,CreateProdcutComponent],
  templateUrl: './products-admin-layout.component.html',
  styleUrl: './products-admin-layout.component.css',
})
export class ProductsAdminLayoutComponent {}
