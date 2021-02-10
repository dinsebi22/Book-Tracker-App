import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AllReadersComponent } from '../all-readers/all-readers.component';
import { User } from '../models/appModels';

@Component({
  selector: 'app-reader-dialog',
  templateUrl: './reader-dialog.component.html',
  styleUrls: ['./reader-dialog.component.css']
})
export class ReaderDialogComponent implements OnInit {

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<AllReadersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  readerValue: User;

  isPreview: boolean = false;

  @Output()
  editReaderEvent: EventEmitter<User> = new EventEmitter();

  @Output()
  deleteReaderEvent: EventEmitter<Boolean> = new EventEmitter();

  ngOnInit(): void {
    if (this.data) {
      this.readerValue = {
        id: this.data.id,
        book_id: this.data.book_id,
        first_name: this.data.first_name,
        last_name: this.data.last_name,
        email: this.data.email
      }
    }
  }


  saveNewDetails() {
    this.editReaderEvent.emit(this.readerValue);
    this.dialogRef.close();
  }

  deleteDetails() {
    this.deleteReaderEvent.emit(true)
    this.dialogRef.close();
  }

  editValues() {
    this.isPreview = true;
  }

  // We can Navigate like this also
  navigateToReaderPage(reader: User) {
    this.router.navigateByUrl('/reader-books')
  }

}
