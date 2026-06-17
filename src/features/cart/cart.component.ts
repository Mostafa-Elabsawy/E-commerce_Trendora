import { Component } from '@angular/core';
import { TitleComponent } from "../title/title.component";

@Component({
  selector: 'app-cart',
  imports: [TitleComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {}
