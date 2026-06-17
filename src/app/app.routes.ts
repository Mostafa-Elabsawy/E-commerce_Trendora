import { Routes } from '@angular/router';
import { AboutComponent } from '../features/about/about/about.component';
import { ContactComponent } from '../features/contact/contact/contact.component';
import { RegisterComponent } from '../core/Auth/register/register.component';
import { LogInComponent } from '../core/Auth/log-in/log-in.component';
import { MainComponent } from '../core/layouts/main/main.component';
export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      {path: 'login',component: LogInComponent},
      {path: 'register',component: RegisterComponent},
    ],
  },
];
