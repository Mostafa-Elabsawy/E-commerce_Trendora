import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ICartItem } from '../../core/models/cart.interface';

@Component({
  selector: 'app-cart',
  imports: [TitleComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }
  cartItems!: ICartItem[];
  ngOnInit(): void {
    this.getCarts();
  }
  getCarts() {
    this.cartService.getAllCarts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartItems = res.items;
      },
      error: (err) => {
        console.error('Failed to load carts:', err);
      },
    });
  }
}
