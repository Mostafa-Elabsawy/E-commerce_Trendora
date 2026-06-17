import { Component } from '@angular/core';
import { TitleComponent } from "../../title/title.component";
import { ProductCardComponent } from "../../product-card/product-card.component";

@Component({
  selector: 'app-products',
  imports: [TitleComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {

   products = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
