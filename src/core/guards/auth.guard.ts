import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const toaster = inject(ToastrService);
    const router = inject(Router);

    const isLoggedIn = authService.isUserLoggedin();
    const role = authService.getStoredRole();
    if (!isLoggedIn) {
        toaster.error('Please Login First!');
        router.navigate(['/login']);
        return false;
    }
    if (role === 'Admin') {
        return true;
    }
    toaster.warning('You Are Not Allowed To View This Page');
    router.navigate(['/home']);
    return false;
};
