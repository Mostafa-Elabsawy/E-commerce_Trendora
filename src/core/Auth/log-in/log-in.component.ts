import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  constructor(
    private _authS: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

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
  onSubmit() {
    if (this.loginForm.valid) {
      let data = this.loginForm.getRawValue();
      this.login(data);
    }
  }

  login(data: any) {
    this._authS.login(data).subscribe({
      next: (res: any) => {
        console.log('Login successful:', res);
        this.toastr.success('Logged in successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Failed to login:', err);
      },
    });
  }
  ngAfterViewInit() {
    this.loginForm.valueChanges.subscribe(() => {
      console.log(this.loginForm.value);
    })
  }
}
