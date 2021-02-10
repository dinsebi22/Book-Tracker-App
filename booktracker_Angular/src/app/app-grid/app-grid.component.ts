import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { JsonApiService } from '../json-api/json-api.service';
import { Book, User } from '../models/appModels';

@Component({
  selector: 'app-app-grid',
  templateUrl: './app-grid.component.html',
  styleUrls: ['./app-grid.component.css'],
})
export class AppGridComponent implements OnInit {
  constructor(private jsonApiService: JsonApiService
  ) {
    this.getBooks();
    this.getReaders();
  }

  bookList: Book[];
  readerList: User[];
  mostPopularBook: Book;

  ngOnInit(): void {
  }

  getMostPopularBook() {
    this.jsonApiService.getMostPopularBook().subscribe({
      next: (response) => {

        this.mostPopularBook = response
      },
      error: (err) => console.error(err.message)
    })
  }


  getBooks() {
    this.jsonApiService.getBooks().subscribe({
      next: (response) => {
        this.bookList = response;
      },
      error: (err) => console.error(err.message),
    });
  }


  getReaders() {
    this.jsonApiService.getReaders().subscribe(
      (response) => {
        this.readerList = response;
        this.getMostPopularBook();
      },
      (error) => console.error(error.message)
    );
  }

}


