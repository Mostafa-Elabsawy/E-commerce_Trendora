import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    isMenuOpen = false;

    constructor(
        private cartservice: CartService,
        private authService: AuthService,
        private router: Router
    ) {}

    cartItemsCount = computed(() => this.cartservice.cart()?.items.length ?? 0);

    get isLoggedIn(): boolean {
        return this.authService.isUserLoggedin();
    }

    get userName(): string {
        const user = this.authService.getStoredUser();
        return user?.displayName || user?.name || user?.email || '';
    }

    logout(): void {
        this.authService.logout();
    }
    toProfile() {

      if (this.authService.getStoredRole()=='Admin'){
        this.router.navigate(['/admin']);
      }
      else if(this.authService.getStoredRole()=='Customer'){
        this.router.navigate(['/profile']);
      }
    }
}
