import { Component, OnInit } from '@angular/core';
import { CartTotalComponent } from "../../shared/components/cart-total/cart-total.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../core/services/checkout.service';
import { DeliveryMethodIdService } from '../../core/services/delivery-method-id.service';
import { IDeliveryMethod } from '../../core/models/deliveryTime.interface';
import { PaymentService } from '../../core/services/payment.service';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [CartTotalComponent, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  constructor(
    private checkoutService: CheckoutService,
    private del: DeliveryMethodIdService,
    private paymentService: PaymentService,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router
  ) { }
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
        this.deliveryMethodIdService = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  placeOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    let data = this.checkoutForm.getRawValue();
    let deliveryMethodId = Number(data.deliveryTime);

    this.paymentService.createPaymentIntent(deliveryMethodId).subscribe({
      next: (res) => {
        console.log("payment intent created successfully", res);

        let orderPayload = {
          deliveryMethodId: deliveryMethodId,
          shipToAddress: {
            firstName: data.firstName,
            lastName: data.lastName,
            street: data.street,
            city: data.city,
            country: data.country
          }
        };

        this.checkoutService.checkOut(orderPayload).subscribe({
          next: (res) => {
            this.toastr.success('Order placed successfully!');
            this.cartService.clearCart();
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error("checkout error", err);
          }
        });
      },
      error: (err) => {
        console.error("payment intent error", err);
      }
    });
  }

}
