import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../models/appModels';

@Component({
  selector: 'app-most-popular-book',
  templateUrl: './most-popular-book.component.html',
  styleUrls: ['./most-popular-book.component.css']
})
export class MostPopularBookComponent implements OnInit {

  constructor() { }

  @Input()
  mostPopularBook: Book;

  ngOnInit(): void {
  }

}
