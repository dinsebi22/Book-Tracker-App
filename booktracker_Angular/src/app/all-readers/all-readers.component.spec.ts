import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReadersComponent } from './all-readers.component';

describe('AllReadersComponent', () => {
  let component: AllReadersComponent;
  let fixture: ComponentFixture<AllReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllReadersComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
