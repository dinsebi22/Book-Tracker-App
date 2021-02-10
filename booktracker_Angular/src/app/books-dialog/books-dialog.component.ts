import { Input, Output } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { AllBooksComponent } from '../all-books/all-books.component';
import { Book } from '../models/appModels';

@Component({
  selector: 'app-books-dialog',
  templateUrl: './books-dialog.component.html',
  styleUrls: ['./books-dialog.component.css'],
})
export class BooksDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AllBooksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) { }

  editedValues: Book;

  @Output()
  editEvent: EventEmitter<Book> = new EventEmitter();

  @Output()
  deleteEvent: EventEmitter<Boolean> = new EventEmitter();

  ngOnInit(): void {
    if (this.data) {
      this.editedValues = {
        id: this.data.id,
        author_first_name: this.data.author_first_name,
        author_last_name: this.data.author_last_name,
        email: this.data.email,
        price: this.data.price,
        book_title: this.data.book_title,
        book_code: this.data.book_code,
      };
    }
  }

  saveNewDetails() {
    this.editEvent.emit(this.editedValues);
    this.dialogRef.close();
  }

  deleteDetails() {
    this.deleteEvent.emit(true);
    this.dialogRef.close();
  }
}
