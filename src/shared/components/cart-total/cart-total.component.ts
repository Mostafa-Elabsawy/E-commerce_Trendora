import { Component, computed } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-total',
  imports: [],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.css',
})
export class CartTotalComponent {
  constructor(private cartService: CartService) { }

  cartItems = computed(() => this.cartService.cart()?.items || []);
  subTotal = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0);
  });
  shipping = computed(() => {
    return this.cartItems().length > 0 ? 10 : 0;
  });

  total = computed(() => {
    return this.subTotal() + this.shipping();
  });
}
