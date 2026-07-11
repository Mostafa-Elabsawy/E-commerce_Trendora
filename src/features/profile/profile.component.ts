import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  public activeTab = 'profile';

  public user = {
    initials: 'JD',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '+1 555 123 4567',
    dob: 'Jan 12, 1990',
    addresses: [
      '123 Maple Street, New York, NY',
      'Apartment 4B, 456 Oak Avenue, San Francisco, CA',
    ],
    orders: 28,
    saved: 12,
    spend: '$4,860',
  };

  public menuItems = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'addresses', label: 'Addresses', icon: '📍' },
    { key: 'orders', label: 'Orders', icon: '📦' },
    { key: 'wishlist', label: 'Wishlist', icon: '❤️' },
  ];

  private readonly _authS = {
    isUserLoggedin: (): boolean => Boolean(localStorage.getItem('authToken') || localStorage.getItem('user')),
    getCurrentUserFromServer: () => of<any>(null),
    getAddressFromServer: () => of<IAddress | null>(null),
    getStoredUser: (): unknown => {
      try {
        return JSON.parse(localStorage.getItem('user') ?? 'null');
      } catch {
        return null;
      }
    },
    updateAddress: (address: IAddress) => of<IAddress>(address),
    logout: (): void => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
  };

  private readonly _orderS = {
    getOrders: () => of<IOrder[]>([]),
  };

  private readonly _wishlistS = {
    wishlist$: new BehaviorSubject<IProduct[]>([]),
    removeFromWishlist: (productId: number): void => {
      const currentItems = this._wishlistS.wishlist$.getValue().filter((item: IProduct) => item.Id !== productId);
      this._wishlistS.wishlist$.next(currentItems);
    },
  };

  public addressForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });
  
  constructor(private _router: Router, private _http: HttpClient) {}
  ngOnInit(): void {
    this.initializeFromStoredUser();
    // if (!this._authS.isUserLoggedin()) {
    //   this._router.navigate(['/login']);
    //   return;
    // }
    this.loadUserProfile();
    this.loadUserAddress();
    this.loadUserOrders();
    this.subscribeToWishlist();
  }

  private initializeFromStoredUser(): void {
    const storedUser = this._authS.getStoredUser();
    if (storedUser && typeof storedUser === 'object') {
      const data = storedUser as { name?: string; email?: string; phone?: string; role?: string };
      this.user.name = data.name || 'Valued Customer';
      this.user.email = data.email || '';
      this.user.phone = data.phone || 'Not provided';
      this.user.initials = this.getInitials(this.user.name);
      this.personalForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
      });
    }
  }
  private loadUserProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return;
    }
    this._http.get<any>(this.getApiUrl('Authentication/profile'), {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: (res) => {
        if (res) {
          this.user.name = res.name || res.displayName || res.userName || 'Valued Customer';
          this.user.email = res.email || res.userEmail || '';
          this.user.phone = res.phone || res.phoneNumber || 'Not provided';
          this.user.initials = this.getInitials(this.user.name);
          this.personalForm.patchValue({
            name: this.user.name,
            email: this.user.email,
            phone: this.user.phone,
          });
          if (res.address) {
            this.user.address = res.address;
            this.patchAddressForm(res.address);
          }
        }
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        this.initializeFromStoredUser();
      }
    });
  }
  private loadUserAddress() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return;
    }
    this._http.get<IAddress>(this.getApiUrl('Authentication/address'), {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: (res) => {
        if (res) {
          this.user.address = res;
          this.patchAddressForm(res);
        }
      },
      error: (err) => {
        console.error('Error fetching address:', err);
      }
    });
  }
  private loadUserOrders() {
    this._orderS.getOrders().subscribe({
      next: (res) => {
        if (res) {
          this.recentOrders = res;
          this.user.ordersCount = res.length;
          
          const total = res.reduce((acc, order) => acc + (order.total || 0), 0);
          this.user.totalSpent = total;
        }
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }
  private subscribeToWishlist() {
    this._wishlistS.wishlist$.subscribe({
      next: (items) => {
        this.wishlistItems = items;
        this.user.savedCount = items.length;
      }
    });
  }
  private getApiUrl(path: string): string {
    const baseUrl = environment.apiURL.replace(/\/?$/, '/');
    return `${baseUrl}${path.replace(/^\/+/, '')}`;
  }

  private getInitials(name: string): string {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  private patchAddressForm(address: IAddress) {
    this.addressForm.patchValue({
      firstName: address.firstName || '',
      lastName: address.lastName || '',
      street: address.street || '',
      city: address.city || '',
      country: address.country || '',
    });
  }
  public setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
