import { Routes } from '@angular/router';
import { RegisterComponent } from '../core/Auth/register/register.component';
import { LogInComponent } from '../core/Auth/log-in/log-in.component';
import { MainComponent } from '../core/layouts/main/main.component';
export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
        {path: '', redirectTo:'register',pathMatch:'full'},
            {
                path: 'login',
                component: LogInComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
        ]
    }
];
