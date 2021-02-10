import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JsonApiService } from '../json-api/json-api.service';
import { Book } from '../models/appModels';

@Component({
  selector: 'app-reader-booklist',
  templateUrl: './reader-booklist.component.html',
  styleUrls: ['./reader-booklist.component.css']
})
export class ReaderBooklistComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'id', 'book_title', 'author_first_name', 'author_last_name', 'remove',
  ];

  dataSource: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() userBookList: Book[];
  @Input() userId: number;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private jsonApiService: JsonApiService,
    private snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<Book>(this.userBookList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetectionRef.detectChanges();
  }

  removeBookFromUser(removedBook: Book) {
    this.jsonApiService.removeBookFromUser(this.userId, removedBook.id).subscribe({
      next: (responseBook) => {
        if (responseBook) {
          const books = this.dataSource.data;
          books.splice(this.dataSource.data.indexOf(removedBook), 1);
          this.dataSource.data = books;

          this.snackBar.open(" Book Removed from User Library ", "!", {
            duration: 1500
          });
        } else {
          this.snackBar.open(" Something went wrong ", "-_-", {
            duration: 1500
          });
        }

      },
      error: (err) => console.error(err.message)
    })

  }
}
