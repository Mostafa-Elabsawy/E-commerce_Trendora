import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  public user = {
    initials: 'JD',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '+1 555 123 4567',
    address: '123 Maple Street, New York, NY',
    memberSince: 'March 2023',
    orders: 28,
    saved: 12,
    spend: '$4,860',
  };

  public menuItems = [
    { label: 'Profile', route: '/profile', active: true },
    { label: 'Orders', route: '/orders' },
    { label: 'Cart', route: '/cart' },
    { label: 'Checkout', route: '/checkout' },
  ];

  public recentOrders = [
    { id: '32541', status: 'Delivered', items: 3, date: 'Jun 18, 2026' },
    { id: '32498', status: 'Processing', items: 1, date: 'Jun 12, 2026' },
  ];
}
