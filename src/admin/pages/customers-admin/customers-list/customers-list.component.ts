import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../../../core/services/Admin/customer.service';
import { CustomerDTO, CreateCustomerRequest } from '../../../../core/models/Admin/customers.interface';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customers-list',
  imports: [ RouterLink, FormsModule],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css',
})
export class CustomersListComponent implements OnInit {
  private readonly customerService = inject(CustomerService);
  private readonly toastr = inject(ToastrService);

  allCustomers = signal<CustomerDTO[]>([]);
  CreateCustomer = signal<boolean>(false);
  isCreating = signal(false);
  isDeleting = signal<string | null>(null);

  newCustomer: CreateCustomerRequest = {
    displayName: '',
    email: '',
    password: '',
    phoneNumber: '',
  };

  ngOnInit(): void {
    this.loadCustomers();
  }

  private loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => this.allCustomers.set(customers),
      error: (err) => {
        console.error('Failed to load customers:', err);
        this.toastr.error('Failed to load customers');
      },
    });
  }

  openCreateModal() {
    this.newCustomer = {
      displayName: '',
      email: '',
      password: '',
      phoneNumber: '',
    };
    this.CreateCustomer.set(true);
  }

  closeCreateModal() {
    this.CreateCustomer.set(false);
  }

  createCustomer(createForm: any): void {
    if (createForm?.invalid) {
      Object.values(createForm.controls).forEach((control: any) => control.markAsTouched());
      this.toastr.error('Please fix the highlighted fields');
      return;
    }
    console.log("ok");
    this.isCreating.set(true);
    this.customerService.createCustomer(this.newCustomer).subscribe({
      next: () => {
        this.toastr.success('Customer created successfully');
        this.closeCreateModal();
        this.loadCustomers();
        this.isCreating.set(false);
      },
      error: (err) => {
        console.error('Failed to create customer:', err);
        this.toastr.error('Failed to create customer');
        this.isCreating.set(false);
      },
    });
  }

  deleteCustomer(id: string): void {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    this.isDeleting.set(id);
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.toastr.success('Customer deleted successfully');
        this.isDeleting.set(null);
        this.loadCustomers();
      },
      error: (err) => {
        console.error('Failed to delete customer:', err);
        this.toastr.error('Failed to delete customer');
        this.isDeleting.set(null);
      },
    });
  }
}
