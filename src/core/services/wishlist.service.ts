import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.interface';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistKey = 'wishlist';
  private wishlistSubject = new BehaviorSubject<IProduct[]>([]);
  public wishlist$ = this.wishlistSubject.asObservable();
  constructor() {
    this.loadWishlist();
  }
  private loadWishlist() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.wishlistKey);
      if (stored) {
        try {
          this.wishlistSubject.next(JSON.parse(stored));
        } catch (e) {
          console.error('Error parsing wishlist from localStorage', e);
          this.wishlistSubject.next([]);
        }
      }
    }
  }
  getWishlistItems(): IProduct[] {
    return this.wishlistSubject.value;
  }
  addToWishlist(product: IProduct) {
    const current = this.wishlistSubject.value;
    if (!current.some((item) => item.Id === product.Id)) {
      const updated = [...current, product];
      this.wishlistSubject.next(updated);
      this.saveWishlist(updated);
    }
  }
  removeFromWishlist(productId: number) {
    const current = this.wishlistSubject.value;
    const updated = current.filter((item) => item.Id !== productId);
    this.wishlistSubject.next(updated);
    this.saveWishlist(updated);
  }
  isInWishlist(productId: number): boolean {
    return this.wishlistSubject.value.some((item) => item.Id === productId);
  }
  toggleWishlist(product: IProduct) {
    if (this.isInWishlist(product.Id)) {
      this.removeFromWishlist(product.Id);
    } else {
      this.addToWishlist(product);
    }
  }
  private saveWishlist(wishlist: IProduct[]) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
    }
  }
}
