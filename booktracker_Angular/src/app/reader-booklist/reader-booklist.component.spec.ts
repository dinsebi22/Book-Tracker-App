import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderBooklistComponent } from './reader-booklist.component';

describe('ReaderBooklistComponent', () => {
  let component: ReaderBooklistComponent;
  let fixture: ComponentFixture<ReaderBooklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderBooklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderBooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
