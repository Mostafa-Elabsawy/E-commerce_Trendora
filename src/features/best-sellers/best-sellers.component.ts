import { Component } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-best-sellers',
  imports: [TitleComponent, ProductCardComponent],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css',
})
export class BestSellersComponent {
  products = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
