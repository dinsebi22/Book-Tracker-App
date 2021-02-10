import { AfterViewInit, ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { JsonApiService } from '../json-api/json-api.service';
import { Book, User } from '../models/appModels';
import { ReaderBooksComponent } from '../reader-books/reader-books.component';

@Component({
  selector: 'app-add-book-table',
  templateUrl: './add-book-table.component.html',
  styleUrls: ['./add-book-table.component.css']
})
export class AddBookTableComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'checked', 'id', 'book_title', 'book_code', 'price', 'author_first_name', 'author_last_name',
  ];

  dataSource: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  addedBooks: number[] = [];

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private jsonApiService: JsonApiService,
    private dialogRef: MatDialogRef<ReaderBooksComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngAfterViewInit(): void {

    this.dataSource = new MatTableDataSource<Book>(this.data.books);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetectionRef.detectChanges();
  }

  addBook(bookId: number) {

    let bookIndex = this.addedBooks.indexOf(bookId)
    if (bookIndex != -1) {
      this.addedBooks.splice(bookIndex, 1);
    } else {
      this.addedBooks.push(bookId)
    }

  }

  saveChanges() {
    this.jsonApiService.addBooksToReader(this.addedBooks, this.data.user).subscribe({
      next: () => {

        this.dialogRef.close()
        // save current route first
        const currentRoute = this.router.url;

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
        });
      },
      error: (err) => console.error(err.message)
    })
  }

}
