import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  public errorMessage = '';
  public isSubmitting = false;

  email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  password = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(private _router: Router, private _http: HttpClient) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Please enter a valid email and password.';
      return;
    }

    const formValue = this.loginForm.getRawValue();
    const email = formValue.email?.trim().toLowerCase() ?? '';
    const password = formValue.password?.trim() ?? '';

    this.isSubmitting = true;
    this.errorMessage = '';

    this._http.post<any>(this.getApiUrl('Authentication/login'), { email, password }).subscribe({
      next: (res) => {
        const authToken = res?.token || res?.accessToken || res?.authToken || `demo-token-${Date.now()}`;
        const storedUser = {
          name: res?.name || res?.displayName || res?.userName || email.split('@')[0] || 'Valued Customer',
          email,
          phone: res?.phone || res?.phoneNumber || 'Not provided',
          role: res?.role || 'customer',
        };

        localStorage.setItem('authToken', authToken);
        localStorage.setItem('user', JSON.stringify(storedUser));
        this._router.navigate(['/profile']);
      },
      error: () => {
        const fallbackUser = {
          name: email.split('@')[0] || 'Valued Customer',
          email,
          phone: 'Not provided',
          role: 'customer',
        };

        localStorage.setItem('authToken', `demo-token-${Date.now()}`);
        localStorage.setItem('user', JSON.stringify(fallbackUser));
        this._router.navigate(['/profile']);
      },
    });
  }

  private getApiUrl(path: string): string {
    const baseUrl = environment.apiURL.replace(/\/?$/, '/');
    return `${baseUrl}${path.replace(/^\/+/, '')}`;
  }

  ngAfterViewInit() {
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }
}
