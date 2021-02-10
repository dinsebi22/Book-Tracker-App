import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

const material = [
  MatButtonModule,
  MatSidenavModule,
  MatGridListModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatListModule,
  MatDividerModule,
  MatDialogModule,
  MatInputModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatCheckboxModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    material
  ],
  exports: [
    material
  ]
})
export class MaterialDataModule { }
