import { Routes } from '@angular/router';
import { AboutComponent } from '../features/about/about.component';
import { ContactComponent } from '../features/contact/contact.component';
import { RegisterComponent } from '../core/Auth/register/register.component';
import { LogInComponent } from '../core/Auth/log-in/log-in.component';
import { MainComponent } from '../core/layouts/main/main.component';
import { ProductsComponent } from '../features/products/products.component';

import { HomeComponent } from '../features/home/home.component';
import { CartComponent } from '../features/cart/cart.component';
import { CheckoutComponent } from '../features/checkout/checkout.component';
import { ProsuctDetailsComponent } from '../features/prosuct-details/prosuct-details.component';
export const routes: Routes = [
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
    ],
  },
];
