import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {
      Id: 1,
      Name: 'Test Product',
      Description: 'Test Description',
      PictureUrl: 'test-url',
      Price: 100,
      StockQuantity: 10,
      InStock: true,
      ProductBrand: 'Brand',
      SubCategory: 'SubCategory',
      CategoryId: 1,
      CategoryName: 'CategoryName',
      Discount: 0
    };
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
