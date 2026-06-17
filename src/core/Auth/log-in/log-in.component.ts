import { Component } from '@angular/core';
import { ReactiveFormsModule ,FormGroup,FormControl,Validators} from '@angular/forms';
import { debounceTime } from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {

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
    console.log("data submited succesfully");
    
    let data = this.loginForm.getRawValue;
    /**/
    
    
  }
  ngAfterViewInit() {
    this.loginForm.valueChanges.subscribe(() => {
      console.log(this.loginForm.value);
    })  
  }
}
