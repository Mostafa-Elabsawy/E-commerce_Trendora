import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../core/models/product.interface';
import { ICartItem } from '../../../core/models/cart.interface';
import { CartService } from '../../../core/services/cart.service';
// import { Datum } from '../../../core/models/product.interface';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: IProduct;

  constructor(private cartService: CartService) { }


  addToCart(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const newItem: ICartItem = {
      id: this.product.id,
      productName: this.product.name,
      pictureUrl: this.product.pictureUrl,
      quantity: 1,
      price: this.product.price,
    };

    this.cartService.addItemToCart(newItem);
  }
}