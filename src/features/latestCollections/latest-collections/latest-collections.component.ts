import { Component } from '@angular/core';
import { TitleComponent } from "../../title/title.component";
import { ProductCardComponent } from "../../product-card/product-card.component";

@Component({
  selector: 'app-latest-collections',
  imports: [TitleComponent, ProductCardComponent],
  templateUrl: './latest-collections.component.html',
  styleUrl: './latest-collections.component.css',
})
export class LatestCollectionsComponent {
  products = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
