import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
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
  signUpForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
  });
  onSubmit() {
    console.log('data submited succesfully');

    let data = this.signUpForm.getRawValue;
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
    this.signUpForm.valueChanges.subscribe(() => {
      console.log(this.signUpForm.value);
    });
  }
}
