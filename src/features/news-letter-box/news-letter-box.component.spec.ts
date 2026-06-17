import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLetterBoxComponent } from './news-letter-box.component';

describe('NewsLetterBoxComponent', () => {
  let component: NewsLetterBoxComponent;
  let fixture: ComponentFixture<NewsLetterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsLetterBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsLetterBoxComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
