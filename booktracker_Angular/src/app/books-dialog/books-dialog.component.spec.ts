import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDialogComponent } from './books-dialog.component';

describe('BooksDialogComponent', () => {
  let component: BooksDialogComponent;
  let fixture: ComponentFixture<BooksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
