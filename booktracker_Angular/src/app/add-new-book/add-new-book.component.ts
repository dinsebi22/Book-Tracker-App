import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonApiService } from '../json-api/json-api.service';
import { Book } from '../models/appModels';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  bookForm: FormGroup;
  bookAddedSuccessfuly: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private jsonApiService: JsonApiService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.bookForm = this.createFormGroup();

    //Subscribe function which logs all the changes to the Form
    // this.bookForm.valueChanges.subscribe(console.log)
  }

  createFormGroup() {
    return this.formBuilder.group({
      author_first_name: ['',
        [Validators.required, Validators.minLength(2)]],
      author_last_name: ['',
        [Validators.required, Validators.minLength(2)]],
      email: ['',
        [Validators.required, Validators.email]],
      book_title: ['',
        [Validators.required, Validators.minLength(2)]],
      price: ['',
        [Validators.required, Validators.min(0.5)]]
    });
  }


  public get author_first_name() {
    return this.bookForm.get('author_first_name');
  }
  public get author_last_name() {
    return this.bookForm.get('author_last_name');
  }
  public get email() {
    return this.bookForm.get('email');
  }
  public get book_title() {
    return this.bookForm.get('book_title');
  }
  public get price() {
    return this.bookForm.get('price');
  }



  addNewBook() {
    let newBook: Book = this.bookForm.getRawValue();

    this.jsonApiService.addNewBook(newBook).subscribe({
      next: () => {
        this.bookAddedSuccessfuly = true;

      },
      error: () => {
        this.snackBar.open(" Book already Exists ", "!", {
          duration: 2500
        });
      }
    })

  }




}
