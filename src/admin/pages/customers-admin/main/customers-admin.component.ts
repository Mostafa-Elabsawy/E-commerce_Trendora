import { Component, signal } from '@angular/core';
import { CustomerProfileComponent } from '../customer-profile/customer-profile.component';
import { CustomersListComponent } from '../customers-list/customers-list.component';
import { CustomerFiltersComponent } from '../customer-filters/customer-filters.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customers-admin',
  imports: [RouterOutlet,CustomerFiltersComponent, CustomersListComponent, CustomerProfileComponent , ],
  templateUrl: './customers-admin.component.html',
  styleUrl: './customers-admin.component.css',
})
export class CustomersAdminComponent {


}