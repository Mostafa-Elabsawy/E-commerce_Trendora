import { Component, signal } from '@angular/core';
import { CustomerFiltersComponent } from '../customer-filters/customer-filters.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  imports: [CustomerFiltersComponent,RouterLink],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css',
})
export class CustomersListComponent {
  allCustomers = signal([
    {
      id: 1001,
      name: 'Yahya Ramadan',
      email: 'yahya@example.com',
      phone: '+20 100 721 5557',
      orderCount: 14,
      totalSpending: 1245.0,
    },
    {
      id: 1002,
      name: 'Mostafa Ehab',
      email: 'mostafa@example.com',
      phone: '+20 109 876 5432',
      orderCount: 8,
      totalSpending: 785.5,
    },
    {
      id: 1003,
      name: 'Ahmed Samir',
      email: 'ahmed.samir@example.com',
      phone: '+20 111 234 5678',
      orderCount: 25,
      totalSpending: 3210.99,
    },
    {
      id: 1004,
      name: 'Sara Mohamed',
      email: 'sara.mohamed@example.com',
      phone: '+20 122 345 6789',
      orderCount: 5,
      totalSpending: 429.75,
    },
  ]);
  CreateCustomer = signal<boolean>(false);

  openCreateModal() {
    this.CreateCustomer.set(true);
  }
  closeCreateModal() {
    this.CreateCustomer.set(false);
  }
}
