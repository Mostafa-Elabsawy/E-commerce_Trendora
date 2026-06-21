import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  public activeTab = 'profile';

  public user = {
    initials: 'JD',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '+1 555 123 4567',
    dob: 'Jan 12, 1990',
    addresses: [
      '123 Maple Street, New York, NY',
      'Apartment 4B, 456 Oak Avenue, San Francisco, CA',
    ],
    orders: 28,
    saved: 12,
    spend: '$4,860',
  };

  public menuItems = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'addresses', label: 'Addresses', icon: '📍' },
    { key: 'orders', label: 'Orders', icon: '📦' },
    { key: 'wishlist', label: 'Wishlist', icon: '❤️' },
  ];

  public recentOrders = [
    { id: '32541', status: 'Delivered', items: 3, date: 'Jun 18, 2026' },
    { id: '32498', status: 'Processing', items: 1, date: 'Jun 12, 2026' },
  ];

  public wishlistItems = [
    { title: 'Wireless Headphones', price: '$99', status: 'Available' },
    { title: 'Travel Backpack', price: '$74', status: 'Low stock' },
  ];

  public setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
