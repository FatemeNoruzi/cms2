import { Component, Inject, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'app-file-delete-component',
    templateUrl: 'file.delete.component.html',
  })
  export class FileDeleteComponent {

    constructor(
      public dialogRef: MatDialogRef<FileDeleteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
      debugger;
      console.log(this.data);
      this.dialogRef.close();
    }
  }