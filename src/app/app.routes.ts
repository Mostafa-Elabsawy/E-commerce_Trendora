import { Routes } from '@angular/router';
import { AboutComponent } from '../features/about/about/about.component';
import { ContactComponent } from '../features/contact/contact/contact.component';
import { LoginComponentComponent } from '../core/layouts/login-component/login-component.component';

export const routes: Routes = [
  { path: '', component: LoginComponentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];
