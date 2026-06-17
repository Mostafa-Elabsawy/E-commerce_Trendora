import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChekoutComponent } from './chekout.component';

describe('ChekoutComponent', () => {
  let component: ChekoutComponent;
  let fixture: ComponentFixture<ChekoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChekoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChekoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
