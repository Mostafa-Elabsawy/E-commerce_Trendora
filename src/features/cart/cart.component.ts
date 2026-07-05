import { Component, OnInit, signal, effect, computed } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ICartItem } from '../../core/models/cart.interface';
import { CartTotalComponent } from "../../shared/components/cart-total/cart-total.component";

@Component({
  selector: 'app-cart',
  imports: [TitleComponent, RouterLink, CartTotalComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
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



  removeItem(itemId: number) {
    this.cartService.removeItemFromCart(itemId);
  }

  updateQuantity(itemId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value, 10);
    if (newQuantity > 0) {
      this.cartService.updateItemQuantity(itemId, newQuantity);
    } else {
      input.value = '1';
      this.cartService.updateItemQuantity(itemId, 1);
    }
  }

}
