import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    const storedUser = this.getStoredUser();
    if (storedUser) {
      this.isAuth.next(storedUser);
    }
    const storedRole = this.getStoredRole();
    if (storedRole) {
      this.roleSubject.next(storedRole);
    }
  }
  private isAuth = new BehaviorSubject<any | null>(null);
  public isAuth$ = this.isAuth.asObservable();
  private url = environment.apiURL + 'Authentication';
  private token_key = 'token';
  private user_key = 'user';
  private role_key = 'role';
  private roleSubject = new BehaviorSubject<string | null>(null);
  public role$ = this.roleSubject.asObservable();


  register(data: any) {
    return this._http.post<any>(`${this.url}/register`, data).pipe(
      tap((res) => {
        console.log(res);
        const token = res.token
        if (token) {
          this.storeToken(token);
          this.storeUser(res);
          this.storeRole(res.role);
          this.roleSubject.next(res.role);
          this._router.navigate(['/login']);
        }
      })
    );
  }

  login(data: any) {
    return this._http.post<any>(`${this.url}/login`, data).pipe(
      tap((res) => {
        const token = res.token
        if (token) {
          this.storeToken(token);
          this.storeUser(res);
          this.storeRole(res.role);
          this.isAuth.next(res);
          this.roleSubject.next(res.role);

          if (res.role === 'Admin') {
            this._router.navigate(['/admin']);
          } else {
            this._router.navigate(['/home']);
          }
        }
      })
    );
  }



  isLoggedin(): any {
    return this.getStoredUser();
  }
  isUserLoggedin(): boolean {
    const token = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.token_key);
    localStorage.removeItem(this.user_key);
    localStorage.removeItem(this.role_key);
    this.isAuth.next(null);
    this.roleSubject.next(null);

    console.log('User logged out');

    this._router.navigate(['/login']);
  }

  private storeUser(user: any): void {
    if (localStorage) {
      localStorage.setItem(this.user_key, JSON.stringify(user));
    }
  }

  getStoredUser(): any {
    try {
      const userData = localStorage.getItem(this.user_key);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error(' Error parsing stored user:', error);
      return null;
    }
  }

  private storeRole(role: string): void {
    if (localStorage) {
      localStorage.setItem(this.role_key, role);
    }
  }

  getStoredRole(): string | null {
    return localStorage.getItem(this.role_key);
  }

  private storeToken(token: string) {
    if (localStorage) {
      localStorage.setItem(this.token_key, token);
    }
  }

  getToken() {
    return localStorage.getItem(this.token_key);
  }
}
