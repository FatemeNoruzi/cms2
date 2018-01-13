import { Component, Inject, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'app-slideshow-delete-component',
    templateUrl: 'slideshow.delete.component.html',
  })
  export class SlideshowDeleteComponent {

    constructor(
      public dialogRef: MatDialogRef<SlideshowDeleteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
      debugger;
      console.log(this.data);
      this.dialogRef.close();
    }
  }