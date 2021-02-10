import { ChangeDetectorRef } from '@angular/core';
import { Component, AfterViewInit, ViewChild, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BooksDialogComponent } from '../books-dialog/books-dialog.component';
import { JsonApiService } from '../json-api/json-api.service';
import { Book } from '../models/appModels';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
})
export class AllBooksComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id', 'book_title', 'book_code', 'price', 'author_first_name', 'author_last_name', 'edit', 'delete',
  ];

  dataSource: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() bookList: Book[];

  constructor(
    private dialog: MatDialog,
    private changeDetectionRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private jsonApiService: JsonApiService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<Book>(this.bookList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetectionRef.detectChanges();
  }

  // Edit book Details
  openEditDialog(element: Book) {
    let editDialogRef = this.dialog.open(BooksDialogComponent, {
      data: element,
    });

    editDialogRef.componentInstance.editEvent.subscribe(
      (emittedValue: Book) => {
        if (emittedValue) {
          this.jsonApiService.saveBookNewDetails(emittedValue).subscribe({
            next: () => {
              const books = this.dataSource.data;
              books.splice(books.indexOf(element), 1);
              books.push(emittedValue);
              this.dataSource.data = books;
              this.snackBar.open(" Book Details Edited ", "^_^", {
                duration: 1500
              });
            },
            error: (err) => console.error(err.message)
          })
        }
      }
    );


  }

  //Delete book
  openDeleteDialog(element: Book) {
    let deleteDialogRef = this.dialog.open(BooksDialogComponent);
    deleteDialogRef.componentInstance.deleteEvent.subscribe(

      (emittedValue: Boolean) => {
        if (emittedValue) {

          this.jsonApiService.deleteBookByID(element.id).subscribe({
            next: () => {

              const books = this.dataSource.data;
              books.splice(this.dataSource.data.indexOf(element), 1);
              this.dataSource.data = books;

              this.snackBar.open(" Book Details Deleted ", "-_-", {
                duration: 1500
              });
            },
            error: (err) => console.error(err.message)
          });
        }
      }
    );
  }


}
