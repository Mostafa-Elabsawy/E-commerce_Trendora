import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { IProduct } from '../../core/models/product.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IAddress } from './models/address.interface';
import { IOrder } from './models/order.interface';
import { IUserProfile } from './models/user-profile.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  public activeTab = 'profile';
  public isEditingAddress = false;
  public isEditingPersonalInfo = false;
  public isLoading = false;
  public successMessage = '';
  public errorMessage = '';

  public personalForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
  });
  
  public user: IUserProfile = {
    initials: '',
    name: '',
    email: '',
    phone: '',
    address: null,
    ordersCount: 0,
    savedCount: 0,
    totalSpent: 0,
  };

  public menuItems = [
    { key: 'profile', label: 'Profile Details', icon: 'fa-user' },
    { key: 'addresses', label: 'Addresses', icon: 'fa-location-dot' },
    { key: 'orders', label: 'Orders', icon: 'fa-box' },
    { key: 'wishlist', label: 'Wishlist', icon: 'fa-heart' },
  ];
  
  public recentOrders: IOrder[] = [];
  public wishlistItems: IProduct[] = [];

  private readonly _authS = {
    isUserLoggedin: (): boolean => Boolean(localStorage.getItem('authToken') || localStorage.getItem('user')),
    getCurrentUserFromServer: () => of<any>(null),
    getAddressFromServer: () => of<IAddress | null>(null),
    getStoredUser: (): unknown => {
      try {
        return JSON.parse(localStorage.getItem('user') ?? 'null');
      } catch {
        return null;
      }
    },
    updateAddress: (address: IAddress) => of<IAddress>(address),
    logout: (): void => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
  };

  private readonly _orderS = {
    getOrders: () => of<IOrder[]>([]),
  };

  private readonly _wishlistS = {
    wishlist$: new BehaviorSubject<IProduct[]>([]),
    removeFromWishlist: (productId: number): void => {
      const currentItems = this._wishlistS.wishlist$.getValue().filter((item: IProduct) => item.id !== productId);
      this._wishlistS.wishlist$.next(currentItems);
    },
  };

  public addressForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });
  
  constructor(private _router: Router, private _http: HttpClient) {}
  ngOnInit(): void {
    this.initializeFromStoredUser();
    // if (!this._authS.isUserLoggedin()) {
    //   this._router.navigate(['/login']);
    //   return;
    // }
    this.loadUserProfile();
    this.loadUserAddress();
    this.loadUserOrders();
    this.subscribeToWishlist();
  }

  private initializeFromStoredUser(): void {
    const storedUser = this._authS.getStoredUser();
    if (storedUser && typeof storedUser === 'object') {
      const data = storedUser as { name?: string; email?: string; phone?: string; role?: string };
      this.user.name = data.name || 'Valued Customer';
      this.user.email = data.email || '';
      this.user.phone = data.phone || 'Not provided';
      this.user.initials = this.getInitials(this.user.name);
      this.personalForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
      });
    }
  }
  private loadUserProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return;
    }
    this._http.get<any>(this.getApiUrl('Authentication/profile'), {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: (res) => {
        if (res) {
          this.user.name = res.name || res.displayName || res.userName || 'Valued Customer';
          this.user.email = res.email || res.userEmail || '';
          this.user.phone = res.phone || res.phoneNumber || 'Not provided';
          this.user.initials = this.getInitials(this.user.name);
          this.personalForm.patchValue({
            name: this.user.name,
            email: this.user.email,
            phone: this.user.phone,
          });
          if (res.address) {
            this.user.address = res.address;
            this.patchAddressForm(res.address);
          }
        }
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        this.initializeFromStoredUser();
      }
    });
  }
  private loadUserAddress() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return;
    }
    this._http.get<IAddress>(this.getApiUrl('Authentication/address'), {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: (res) => {
        if (res) {
          this.user.address = res;
          this.patchAddressForm(res);
        }
      },
      error: (err) => {
        console.error('Error fetching address:', err);
      }
    });
  }
  private loadUserOrders() {
    this._orderS.getOrders().subscribe({
      next: (res) => {
        if (res) {
          this.recentOrders = res;
          this.user.ordersCount = res.length;
          
          const total = res.reduce((acc, order) => acc + (order.total || 0), 0);
          this.user.totalSpent = total;
        }
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }
  private subscribeToWishlist() {
    this._wishlistS.wishlist$.subscribe({
      next: (items) => {
        this.wishlistItems = items;
        this.user.savedCount = items.length;
      }
    });
  }
  private getApiUrl(path: string): string {
    const baseUrl = environment.apiURL.replace(/\/?$/, '/');
    return `${baseUrl}${path.replace(/^\/+/, '')}`;
  }

  private getInitials(name: string): string {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  private patchAddressForm(address: IAddress) {
    this.addressForm.patchValue({
      firstName: address.firstName || '',
      lastName: address.lastName || '',
      street: address.street || '',
      city: address.city || '',
      country: address.country || '',
    });
  }
  public setActiveTab(tab: string) {
    this.activeTab = tab;
    this.isEditingAddress = false;
    this.isEditingPersonalInfo = false;
    this.clearMessages();
  }
  public toggleEditAddress() {
    this.isEditingAddress = !this.isEditingAddress;
    this.clearMessages();
    if (this.isEditingAddress && this.user.address) {
      this.patchAddressForm(this.user.address);
    }
  }
  public toggleEditPersonalInfo() {
    this.isEditingPersonalInfo = !this.isEditingPersonalInfo;
    this.clearMessages();
    if (this.isEditingPersonalInfo) {
      this.personalForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
      });
    }
  }
  public onSavePersonalInfo() {
    if (this.personalForm.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }
    this.isLoading = true;
    this.clearMessages();
    const formValue = this.personalForm.value as { name: string; email: string; phone: string };
    this.user.name = formValue.name;
    this.user.email = formValue.email;
    this.user.phone = formValue.phone;
    this.user.initials = this.getInitials(this.user.name);
    this.isEditingPersonalInfo = false;
    this.isLoading = false;
    this.successMessage = 'Personal information updated successfully!';
    setTimeout(() => this.clearMessages(), 3000);
  }
  public onSaveAddress() {
    if (this.addressForm.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }
    this.isLoading = true;
    this.clearMessages();
    const addressData: IAddress = this.addressForm.value as IAddress;
    this._authS.updateAddress(addressData).subscribe({
      next: (res) => {
        this.user.address = res;
        this.isEditingAddress = false;
        this.isLoading = false;
        this.successMessage = 'Address updated successfully!';
        setTimeout(() => this.clearMessages(), 3000);
      },
      error: (err) => {
        console.error('Error saving address:', err);
        this.errorMessage = 'Failed to update address. Please try again.';
        this.isLoading = false;
      }
    });
  }
  public removeFromWishlist(productId: number) {
    this._wishlistS.removeFromWishlist(productId);
    this.successMessage = 'Item removed from wishlist.';
    setTimeout(() => this.clearMessages(), 2000);
  }
  public logout() {
    this._authS.logout();
    this._router.navigate(['/login']);
  }
  private clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
