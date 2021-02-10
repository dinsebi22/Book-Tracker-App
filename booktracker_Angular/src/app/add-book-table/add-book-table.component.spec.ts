import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookTableComponent } from './add-book-table.component';

describe('AddBookTableComponent', () => {
  let component: AddBookTableComponent;
  let fixture: ComponentFixture<AddBookTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
