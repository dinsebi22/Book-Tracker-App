import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, User } from '../models/appModels';

@Injectable({
  providedIn: 'root',
})
export class JsonApiService {
  constructor(private http: HttpClient) { }

  // readonly URL_DATA_URL = 'https://my.api.mockaroo.com/readers.json?key=4f57e7d0';
  // readonly BOOKS_DATA_URL = 'https://my.api.mockaroo.com/books.json?key=4f57e7d0';

  readonly BACKEND_BOOK_CONTROLLER_URL = 'http://localhost:8080/bookController'
  readonly BACKEND_USER_CONTROLLER_URL = 'http://localhost:8080/userController'

  public getBooks(): Observable<Book[]> {
    let url = this.BACKEND_BOOK_CONTROLLER_URL + '/books';
    return this.http.get<Book[]>(url);
  }

  public getReaders(): Observable<User[]> {
    let url = this.BACKEND_USER_CONTROLLER_URL + '/users';
    return this.http.get<User[]>(url);
  }

  public getUserData(id: string): Observable<User> {
    let url = this.BACKEND_USER_CONTROLLER_URL + `/book-reader/${id}`;
    return this.http.get<User>(url)
  }

  public getMostPopularBook(): Observable<Book> {
    let url = this.BACKEND_BOOK_CONTROLLER_URL + '/mostPopularBook'
    return this.http.get<Book>(url)
  }

  public deleteBookByID(id: number): Observable<{}> {
    let url = this.BACKEND_BOOK_CONTROLLER_URL + `/deleteBook/${id}`
    return this.http.delete(url);
  }

  public deleteUserByID(id: number): Observable<{}> {
    let url = this.BACKEND_USER_CONTROLLER_URL + `/deleteUser/${id}`;
    return this.http.delete(url);
  }

  public saveUserNewDetails(userDto: User): Observable<{}> {
    let url = this.BACKEND_USER_CONTROLLER_URL + `/saveUserNewDetails`
    return this.http.put(url, userDto);
  }

  public saveBookNewDetails(bookDto: Book): Observable<{}> {
    let url = this.BACKEND_BOOK_CONTROLLER_URL + `/saveBookNewDetails`;
    return this.http.put(url, bookDto);
  }

  public getUserBooks(userId: number): Observable<Book[]> {
    let url = this.BACKEND_USER_CONTROLLER_URL + `/getUserBooks/${userId}`;
    return this.http.get<Book[]>(url);
  }

  public removeBookFromUser(userId: number, bookId: number): Observable<Book> {
    let url = this.BACKEND_USER_CONTROLLER_URL + `/removeBookFromUser/${userId}/${bookId}`;

    return this.http.delete<Book>(url)
  }

  public addNewBook(bookDto: Book): Observable<Book> {
    let url = this.BACKEND_BOOK_CONTROLLER_URL + "/addNewBook";
    return this.http.post<Book>(url, bookDto);
  }

  public addNewUser(userDto: User): Observable<User> {
    let url = this.BACKEND_USER_CONTROLLER_URL + "/addNewUser";
    return this.http.post<User>(url, userDto);
  }

  public addBooksToReader(bookList: number[], userId: number): Observable<User> {
    let url = this.BACKEND_USER_CONTROLLER_URL + `/addBooksToUser/${userId}`
    return this.http.post<User>(url, bookList)
  }
}
