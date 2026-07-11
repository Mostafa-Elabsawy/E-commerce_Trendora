import { Injectable, inject, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../core/models/product.interface';
import { IAddress } from '../../core/models/userData.interface';
import { IOrder } from '../../core/models/order.interface';
import { IUserProfile } from '../../features/profile/models/user-profile.interface';
import { AuthService } from '../../core/services/auth.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { ProfileService } from '../../core/services/profile.service';
import { OrderService } from '../../core/services/order.service';

@Injectable({ providedIn: 'root' })
export class ProfileStore {
  private appRef = inject(ApplicationRef);
  private authS = inject(AuthService);
  private profileS = inject(ProfileService);
  private orderS = inject(OrderService);
  private wishlistS = inject(WishlistService);
  private router = inject(Router);

  user: IUserProfile = {
    initials: '',
    name: '',
    email: '',
    phone: '',
    address: null,
    ordersCount: 0,
    savedCount: 0,
    totalSpent: 0,
  };

  recentOrders: IOrder[] = [];
  wishlistItems: IProduct[] = [];
  isLoadingProfile = true;
  successMessage = '';
  errorMessage = '';

  init(): void {
    this.loadStoredUser();
    this.loadProfile();
    this.loadAddress();
    this.loadOrders();
    this.loadWishlist();
  }

  private loadStoredUser(): void {
    const stored = this.authS.getStoredUser();
    if (stored && typeof stored === 'object') {
      const data = stored as any;
      this.user.name = data.displayName || data.name || data.userName || data.Name || 'Valued Customer';
      this.user.email = data.email || data.Email || '';
      this.user.phone = data.phoneNumber || data.phone || data.PhoneNumber || 'Not provided';
      this.user.initials = this.getInitials(this.user.name);
    }
  }

  private loadProfile(): void {
    const token = this.authS.getToken();
    if (!token) {
      this.isLoadingProfile = false;
      return;
    }

    this.profileS.getCurrentUser(token).subscribe({
      next: (res) => {
        if (!res) {
          this.isLoadingProfile = false;
          return;
        }

        this.user.name = res.displayName || res.name || res.userName || 'Valued Customer';
        this.user.email = res.email || '';
        this.user.phone = res.phoneNumber || res.phone || 'Not provided';
        this.user.initials = this.getInitials(this.user.name);

        if (res.address) {
          this.user.address = res.address;
        }

        const currentStored = this.authS.getStoredUser() || {};
        localStorage.setItem('user', JSON.stringify({
          ...currentStored,
          displayName: this.user.name,
          email: this.user.email,
          phoneNumber: this.user.phone,
          address: res.address,
        }));

        this.isLoadingProfile = false;
        this.appRef.tick(); // force UI refresh without click
      },
      error: (err) => {
        console.error('[Store] Error fetching CurrentUser:', err);
        this.errorMessage = 'Failed to load profile from server.';
        this.isLoadingProfile = false;
        this.appRef.tick();
        setTimeout(() => this.clearMessages(), 4000);
      },
    });
  }

  private loadAddress(): void {
    const token = this.authS.getToken();
    if (!token) return;

    this.profileS.getAddress(token).subscribe({
      next: (res) => {
        if (res) {
          this.user.address = res;
          this.appRef.tick();
        }
      },
      error: (err) => {
        console.error('[Store] Error fetching address:', err);
        if (err.status !== 404) {
          this.errorMessage = 'Failed to load address.';
        }
      },
    });
  }

  private loadOrders(): void {
    const token = this.authS.getToken();
    if (!token) return;

    this.orderS.getUserOrders(token).subscribe({
      next: (res) => {
        if (!res) return;

        this.recentOrders = res.map((order: any) => ({
          ...order,
          summary: order.items?.map((item: any) => item.productName).join(', ') || 'Order summary',
        }));

        this.user.ordersCount = res.length;
        this.user.totalSpent = res.reduce((acc: number, order: any) => acc + (order.total || 0), 0);
        this.appRef.tick();
      },
      error: (err) => {
        console.error('[Store] Error fetching orders:', err);
        this.errorMessage = 'Failed to load orders from server.';
        setTimeout(() => this.clearMessages(), 4000);
      },
    });
  }

  private loadWishlist(): void {
    this.wishlistS.wishlist$.subscribe({
      next: (items) => {
        this.wishlistItems = items;
        this.user.savedCount = items.length;
        this.appRef.tick();
      },
    });
  }

  savePersonalInfo(value: { name: string; email: string; phone: string }): void {
    this.user.name = value.name;
    this.user.email = value.email;
    this.user.phone = value.phone;
    this.user.initials = this.getInitials(this.user.name);
    this.successMessage = 'Personal information updated successfully!';
    setTimeout(() => this.clearMessages(), 3000);
  }

  saveAddress(value: IAddress) {
    const token = this.authS.getToken();
    if (!token) {
      throw new Error('No auth token');
    }
    return this.profileS.updateAddress(value, token);
  }

  removeFromWishlist(productId: number): void {
    this.wishlistS.removeFromWishlist(productId);
    this.successMessage = 'Item removed from wishlist.';
    setTimeout(() => this.clearMessages(), 2000);
  }

  logout(): void {
    this.authS.logout();
    this.router.navigate(['/login']);
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  showError(msg: string): void {
    this.errorMessage = msg;
    setTimeout(() => this.clearMessages(), 4000);
  }

  private getInitials(name: string): string {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
}