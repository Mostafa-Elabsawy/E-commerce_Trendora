import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isLoggedIn = authService.isUserLoggedin();
    const role = authService.getStoredRole();
    if (!isLoggedIn) {
      router.navigate(['/login']);
      return false;
    }
    if (role === 'Admin') {
        return true;
    }
    router.navigate(['/home']);
    return false;
};
