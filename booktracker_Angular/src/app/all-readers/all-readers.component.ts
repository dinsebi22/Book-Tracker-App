import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonApiService } from '../json-api/json-api.service';
import { User } from '../models/appModels';
import { ReaderDialogComponent } from '../reader-dialog/reader-dialog.component';

@Component({
  selector: 'app-all-readers',
  templateUrl: './all-readers.component.html',
  styleUrls: ['./all-readers.component.css'],
})
export class AllReadersComponent implements AfterViewInit {
  constructor(
    private jsonApiService: JsonApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  @Input() readerList: User[];

  ngAfterViewInit(): void { }

  openReaderDetailDialog(element: User) {
    let editDialogRef = this.dialog.open(ReaderDialogComponent, {
      data: element
    })

    editDialogRef.componentInstance.editReaderEvent.subscribe(
      (emmitedValue: User) => {
        if (editDialogRef.componentInstance.isPreview && emmitedValue) {
          this.jsonApiService.saveUserNewDetails(emmitedValue).subscribe({
            next: () => {
              this.readerList.splice(this.readerList.indexOf(element), 1);
              this.readerList.push(emmitedValue);
              this.snackBar.open(" Reader Details Edited ", "^_^", {
                duration: 1500
              });
            },
            error: (err) => console.error(err.message)
          })

        }

      }
    )

  }

  openReaderDeleteDialog(element: User) {
    let editDialogRef = this.dialog.open(ReaderDialogComponent)
    editDialogRef.componentInstance.deleteReaderEvent.subscribe(
      (emmitedValue: Boolean) => {
        if (emmitedValue) {

          this.jsonApiService.deleteUserByID(element.id).subscribe({
            next: () => {

              this.readerList.splice(this.readerList.indexOf(element), 1);
              this.snackBar.open(" Reader Details Deleted ", "-_-", {
                duration: 1500
              })
            },
            error: (err) => console.error(err.message)
          });
        }
      }
    )
  }
}
