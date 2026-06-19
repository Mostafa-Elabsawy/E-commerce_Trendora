import { Component } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [TitleComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {}
