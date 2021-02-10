import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonApiService } from '../json-api/json-api.service';
import { Book, User } from '../models/appModels';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

  userForm: FormGroup;
  userAddedSucessfuly: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private jsonApiService: JsonApiService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userForm = this.createFormGroup();

    //Subscribe function which logs all the changes to the Form
    // this.userForm.valueChanges.subscribe(console.log)
  }

  createFormGroup() {
    return this.formBuilder.group({
      first_name: ['',
        [Validators.required, Validators.minLength(2)]],
      last_name: ['',
        [Validators.required, Validators.minLength(2)]],
      email: ['',
        [Validators.required, Validators.email]]
    });
  }


  public get first_name() {
    return this.userForm.get('first_name');
  }
  public get last_name() {
    return this.userForm.get('last_name');
  }
  public get email() {
    return this.userForm.get('email');
  }



  addNewUser() {
    let newUser: User = this.userForm.getRawValue();

    this.jsonApiService.addNewUser(newUser).subscribe({
      next: () => {
        this.userAddedSucessfuly = true;
      },
      error: () => {

        this.snackBar.open(" User already Exists ", "!", {
          duration: 2500
        });
      }
    })

  }

}
