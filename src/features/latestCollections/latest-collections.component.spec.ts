import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestCollectionsComponent } from './latest-collections.component';

describe('LatestCollectionsComponent', () => {
  let component: LatestCollectionsComponent;
  let fixture: ComponentFixture<LatestCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestCollectionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LatestCollectionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
