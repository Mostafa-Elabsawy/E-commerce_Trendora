import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authS: AuthService) { }
  name = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  password = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
  });
  onSubmit() {
    console.log('data submited succesfully');

    let data = this.registerForm.getRawValue();

    let payload = {
      displayName: data.name,
      email: data.email,
      password: data.password
    };

    this.authS.register(payload).subscribe({
      next: (res) => {
        console.log(res);

      }, error: (err) => {
        console.error('Registration failed:', err.error);
        if (err.error && err.error.errors) {
          console.error('Validation errors:', err.error.errors);
        }
      }
    })

    /**/
  }
  ngAfterViewInit() {
    this.email.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      let exist = false;
      /*check email exist */
      if (exist) {
        this.email.reset();
        this.email.markAsDirty();
      }
    });
    this.registerForm.valueChanges.subscribe(() => {
      console.log(this.registerForm.value);
    });
  }
}
