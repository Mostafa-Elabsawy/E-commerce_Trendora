import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { IUserData } from '../models/userData.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
  }
  private isAuth = new BehaviorSubject<any | null>(null);
  public isAuth$ = this.isAuth.asObservable();
  private url = environment.apiURL + 'Authentication';
  private token_key = 'token';
  private user_key = 'user';


  register(data: any) {
    return this._http.post<any>(`${this.url}/register`, data).pipe(
      tap((res) => {
        console.log(res);
        const token = res.token
        if (token) {
          this.storeToken(token);
          const decode = this.decodeToken(token);
          if (decode) {
            this.storeUser(decode);
          }
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
          const decode = this.decodeToken(token);
          if (decode) {
            this.storeUser(decode);
            this.isAuth.next(decode);

            if (decode?.role) {

              if (decode.role === 'Admin') {
                this._router.navigate(['/admin']);
              } else {
                this._router.navigate(['/home']);
              }
            }
          }
        }
      })
    );
  }



  isLoggedin(): IUserData | null {
    const token = this.getToken();
    if (token) {
      const decode = this.decodeToken(token);
      return decode;
    }
    return null;
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
    this.isAuth.next(null);

    console.log('User logged out');

    this._router.navigate(['/login']);
  }

  private storeUser(user: IUserData): void {
    if (localStorage) {
      localStorage.setItem(this.user_key, JSON.stringify(user));
    }
  }

  getStoredUser(): IUserData | null {
    try {
      const userData = localStorage.getItem(this.user_key);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error(' Error parsing stored user:', error);
      return null;
    }
  }



  private decodeToken(token: string): IUserData | null {
    try {
      const decode = jwtDecode<IUserData>(token);
      if (!decode) {
        return null;
      }
      if (decode.exp) {
        const expiry = decode.exp * 1000;
        if (expiry > Date.now()) {
          return decode;
        }
      }
      return null;
    } catch (err) {
      return null;
    }
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
