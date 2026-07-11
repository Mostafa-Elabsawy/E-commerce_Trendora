import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IAddress } from '../../core/models/userData.interface';
import { ProfileStore } from '../../core/services/profile.store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  activeTab = 'profile';
  isEditingAddress = false;
  isEditingPersonalInfo = false;
  isLoading = false;

  personalForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
  });

  addressForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });

  menuItems = [
    { key: 'profile', label: 'Profile Details', icon: 'fa-user' },
    { key: 'addresses', label: 'Addresses', icon: 'fa-location-dot' },
    { key: 'orders', label: 'Orders', icon: 'fa-box' },
    { key: 'wishlist', label: 'Wishlist', icon: 'fa-heart' },
  ];

  // Proxies — your HTML keeps using {{ user.name }}, {{ recentOrders }}, etc.
  get user() { return this.store.user; }
  get recentOrders() { return this.store.recentOrders; }
  get wishlistItems() { return this.store.wishlistItems; }
  get isLoadingProfile() { return this.store.isLoadingProfile; }
  get successMessage() { return this.store.successMessage; }
  get errorMessage() { return this.store.errorMessage; }

  constructor(private store: ProfileStore) {}

  ngOnInit(): void {
    this.store.init();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.isEditingAddress = false;
    this.isEditingPersonalInfo = false;
    this.store.clearMessages();
  }

  toggleEditAddress(): void {
    this.isEditingAddress = !this.isEditingAddress;
    this.store.clearMessages();
    if (this.isEditingAddress && this.user.address) {
      this.patchAddressForm(this.user.address);
    }
  }

  toggleEditPersonalInfo(): void {
    this.isEditingPersonalInfo = !this.isEditingPersonalInfo;
    this.store.clearMessages();
    if (this.isEditingPersonalInfo) {
      this.personalForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
      });
    }
  }

  onSavePersonalInfo(): void {
    if (this.personalForm.invalid) {
      this.store.showError('Please fill out all fields correctly.');
      return;
    }
    this.isLoading = true;
    this.store.savePersonalInfo(this.personalForm.value as { name: string; email: string; phone: string });
    this.isLoading = false;
    this.isEditingPersonalInfo = false;
  }

  onSaveAddress(): void {
    if (this.addressForm.invalid) {
      this.store.showError('Please fill out all fields correctly.');
      return;
    }
    this.isLoading = true;
    this.store.saveAddress(this.addressForm.value as IAddress).subscribe({
      next: () => {
        this.isEditingAddress = false;
        this.isLoading = false;
        this.store.successMessage = 'Address updated successfully!';
        setTimeout(() => this.store.clearMessages(), 3000);
      },
      error: () => {
        this.store.showError('Failed to update address. Please try again.');
        this.isLoading = false;
      },
    });
  }

  removeFromWishlist(productId: number): void {
    this.store.removeFromWishlist(productId);
  }

  logout(): void {
    this.store.logout();
  }

  private patchAddressForm(address: IAddress): void {
    this.addressForm.patchValue({
      firstName: address.firstName || '',
      lastName: address.lastName || '',
      street: address.street || '',
      city: address.city || '',
      country: address.country || '',
    });
  }
}