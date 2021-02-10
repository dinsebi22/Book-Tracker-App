import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularBookComponent } from './most-popular-book.component';

describe('MostPopularBookComponent', () => {
  let component: MostPopularBookComponent;
  let fixture: ComponentFixture<MostPopularBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPopularBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
