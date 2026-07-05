import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { ICart, ICartItem } from '../models/cart.interface';
import { tap } from 'rxjs';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private url = environment.apiURL + 'Baskets';
  cart = signal<ICart | null>(null);
  constructor(private http: HttpClient) {
    this.initCart();
  }

  private initCart() {
    const cartId = localStorage.getItem('cart_id');
    if (cartId) {
      this.getCart(cartId).subscribe({
        next: (cartData) => {
          this.cart.set(cartData);
        },
        error: () => {
          localStorage.removeItem('cart_id');
          this.cart.set(null);
        }
      });
    }
  }

  getCart(id: string) {
    return this.http.get<ICart>(this.url + '?id=' + id);
  }

  getAllCarts() {
    const cartId = localStorage.getItem('cart_id');
    if (cartId) {
      return this.http.get(this.url + '?id=' + cartId);
    }
    return this.http.get(this.url);
  }

  setCart(cart: ICart) {
    return this.http.post<ICart>(this.url, cart).pipe(
      tap((res: ICart) => {
        this.cart.set(res);
      })
    );
  }

  private createCart(): ICart {
    const cart: ICart = {
      id: 'cart_' + Math.random().toString(36).substring(2, 10),
      items: [],
      clientSecret: null,
      paymentIntentId: null,
      deliveryMethodId: null,
      shippingPrice: null
    };
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }

  addItemToCart(item: ICartItem) {
    const currentCart = this.cart() ?? this.createCart();

    const existingItem = currentCart.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentCart.items.push(item);
    }

    this.setCart(currentCart).subscribe({
      next: () => console.log('Cart updated successfully!'),
      error: (err) => console.error('Failed to update cart:', err)
    });
  }

  removeItemFromCart(itemId: number) {
    const currentCart = this.cart();
    if (!currentCart) return;

    currentCart.items = currentCart.items.filter(i => i.id !== itemId);

    this.setCart(currentCart).subscribe({
      next: () => console.log('Item removed '),
      error: (err) => console.error('Failed to remove item:', err)
    });
  }

  updateItemQuantity(itemId: number, quantity: number) {
    const currentCart = this.cart();
    if (!currentCart) return;

    const item = currentCart.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;

      if (item.quantity <= 0) {
        this.removeItemFromCart(itemId);
        return;
      }

      this.setCart(currentCart).subscribe({
        next: () => console.log('Quantity updated successfully'),
        error: (err) => console.error('Failed to update quantity:', err)
      });
    }
  }

}
