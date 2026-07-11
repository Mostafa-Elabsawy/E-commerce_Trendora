import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    private authService: AuthService
  ) { }

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
}

