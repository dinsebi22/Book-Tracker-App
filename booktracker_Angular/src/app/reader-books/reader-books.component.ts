import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AddBookTableComponent } from '../add-book-table/add-book-table.component';
import { JsonApiService } from '../json-api/json-api.service';
import { Book, User } from '../models/appModels';

@Component({
  selector: 'app-reader-books',
  templateUrl: './reader-books.component.html',
  styleUrls: ['./reader-books.component.css']
})
export class ReaderBooksComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private jsonApiService: JsonApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  user: User;
  booksForUser: Book[];
  allBooks: Book[];

  ngOnInit(): void {
    this.getUserData();
    this.getAllBooks();
  }

  getUserData() {
    let userId: string = this.router.snapshot.paramMap.get('id')!;
    // let userId : string = this.router.snapshot.paramMap.get('id')! --> ' ! ' ;
    // It tells TypeScript that even though something looks like it could be null, it can trust you that it's not

    this.jsonApiService.getUserData(userId).subscribe(
      (response) => {
        this.user = response;
        this.getUserBooks(response.id);
      }
    )

  }

  getUserBooks(userId: number) {
    this.jsonApiService.getUserBooks(userId).subscribe({
      next: (response) => {
        this.booksForUser = response;
      },
      error: (err) => console.error(err.message)
    })
  }


  private getAllBooks() {
    this.jsonApiService.getBooks().subscribe({
      next: (response) => {
        this.allBooks = response;
      },
      error: (err) => {
        this.snackBar.open(" Something went Wrong.. ", "X_X", {
          duration: 1500
        });
      }
    });
  }

  openAddBookDialog() {
    this.removeOwnedBooks();
    this.dialog.open(AddBookTableComponent, {
      data: { books: this.allBooks, user: this.user.id }
    });
  }


  private removeOwnedBooks() {
    for (let i = 0; i < this.booksForUser.length; i++) {
      let bookIndex = this.allBooks.map(function (e) { return e.id; }).indexOf(this.booksForUser[i].id);
      console.log(bookIndex);

      if (bookIndex >= 0) {
        this.allBooks.splice(bookIndex, 1);

      }
    }
  }

}
