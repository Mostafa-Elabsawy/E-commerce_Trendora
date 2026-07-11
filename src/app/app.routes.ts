import { Routes } from '@angular/router';
import { AboutComponent } from '../features/about/about.component';
import { ContactComponent } from '../features/contact/contact.component';
import { RegisterComponent } from '../core/Auth/register/register.component';
import { LogInComponent } from '../core/Auth/log-in/log-in.component';
import { MainComponent } from '../core/layouts/main/main.component';
import { ProductsComponent } from '../features/products/products.component';
import { HomeComponent } from '../features/home/home.component';
import { CartComponent } from '../features/cart/cart.component';
import { AdminMainComponent } from '../admin/layout/admin-main/admin-main.component';
import { OverviewAdminComponent } from '../admin/pages/overview-admin/overview-admin.component';
import { AllProductsAdminComponent } from '../admin/pages/products-admin/products/products-admin.component';
import { ProductsAdminLayoutComponent } from '../admin/pages/products-admin/main/products-admin-layout.component';
import { CustomersAdminComponent } from '../admin/pages/customers-admin/main/customers-admin.component';
import { ListOrdersComponent } from '../admin/pages/orders-admin/list-orders/list-orders.component';
import { OrdersAdminLayoutComponent } from '../admin/pages/orders-admin/main/orders-admin-layout.component';
import { OrderDetailComponent } from '../admin/pages/orders-admin/order-detail/order-detail.component';
import { CheckoutComponent } from '../features/checkout/checkout.component';
import { ProsuctDetailsComponent } from '../features/prosuct-details/prosuct-details.component';
import { CustomerProfileComponent } from '../admin/pages/customers-admin/customer-profile/customer-profile.component';
import { CustomersListComponent } from '../admin/pages/customers-admin/customers-list/customers-list.component';
import { EditProductComponent } from '../admin/pages/products-admin/edit-product/edit-product.component';
import { ProfileComponent } from '../features/profile/profile.component';
import { ViewProductComponent } from '../admin/pages/products-admin/view-product/view-product.component';


export const routes: Routes = [
  {
    path:'',
    redirectTo:'/admin/customers',
    pathMatch:'full'
  },
   {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LogInComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'home', component: HomeComponent },
      { path: 'collection', component: ProductsComponent },
      { path: 'productDetails/:id', component: ProsuctDetailsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminMainComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewAdminComponent },
      {
        path: 'products',
        component: ProductsAdminLayoutComponent,
        children: [
          { path: '', component: AllProductsAdminComponent },
          {
            path: 'view/:id',
            component: ViewProductComponent,
          },
          {
            path: 'edit/:id',
            component: EditProductComponent,
          },
        ],
      },
      {
        path: 'customers', component: CustomersAdminComponent, children: [
          { path: '', component: CustomersListComponent },
          { path: ':id', component: CustomerProfileComponent },
      ] },
      {
        path: 'orders',
        component: OrdersAdminLayoutComponent,
        children: [
          { path: '', component: ListOrdersComponent },
          { path: ':id', component: OrderDetailComponent },
        ],
      },
    ],
  },
];
