import { Component, OnInit } from '@angular/core';
import { CartTotalComponent } from "../../shared/components/cart-total/cart-total.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../core/services/checkout.service';
import { DeliveryMethodIdService } from '../../core/services/delivery-method-id.service';
import { IDeliveryMethod } from '../../core/models/deliveryTime.interface';

@Component({
  selector: 'app-checkout',
  imports: [CartTotalComponent, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  constructor(private checkoutService: CheckoutService, private del: DeliveryMethodIdService) { }
  deliveryMethodIdService: IDeliveryMethod[] = []

  firstName = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  lastName = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  street = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  city = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  country = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  deliveryTime = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  checkoutForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    street: this.street,
    city: this.city,
    country: this.country,
    deliveryTime: this.deliveryTime,
  });

  ngOnInit(): void {
    this.del.getDeliveryMethods().subscribe({
      next: (res) => {
        console.log(res);
        
        this.deliveryMethodIdService = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  placeOrder() {
    let data = this.checkoutForm.getRawValue();
    let payload = {
      deliveryMethodId: 1,
      firstName: data.firstName,
      lastName: data.lastName,
      street: data.street,
      city: data.city,
      country: data.country,
      deliveryTime: data.deliveryTime,
    };

    this.checkoutService.checkOut(payload).subscribe({
      next: (res) => {
        console.log("order placed successfully",res);

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
