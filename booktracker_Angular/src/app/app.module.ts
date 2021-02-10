import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AppGridComponent } from './app-grid/app-grid.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { AllReadersComponent } from './all-readers/all-readers.component';
import { BooksDialogComponent } from './books-dialog/books-dialog.component';

import { HttpClientModule } from '@angular/common/http';
import { ReaderDialogComponent } from './reader-dialog/reader-dialog.component';
import { ReaderBooksComponent } from './reader-books/reader-books.component';
import { MostPopularBookComponent } from './most-popular-book/most-popular-book.component';
import { MaterialDataModule } from './material-data/material-data.module';
import { RouterModule, Routes } from '@angular/router';
import { ReaderBooklistComponent } from './reader-booklist/reader-booklist.component';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { AddBookTableComponent } from './add-book-table/add-book-table.component';

const routes: Routes = [
  { path: 'reader-books/:id', component: ReaderBooksComponent },
  { path: 'home', component: SideNavComponent },
  { path: 'addNewBook', component: AddNewBookComponent },
  { path: 'addNewUser', component: AddNewUserComponent },
  { path: '', redirectTo: "home", pathMatch: 'full' },
  { path: '**', redirectTo: "home", pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    AppGridComponent,
    MostPopularBookComponent,
    AllBooksComponent,
    AllReadersComponent,
    BooksDialogComponent,
    ReaderDialogComponent,
    ReaderBooksComponent,
    ReaderBooklistComponent,
    AddNewBookComponent,
    AddNewUserComponent,
    AddBookTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialDataModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    MaterialDataModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
