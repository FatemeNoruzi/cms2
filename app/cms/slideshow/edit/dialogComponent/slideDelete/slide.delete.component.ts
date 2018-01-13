import { Component, Inject, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'app-slide-delete-component',
    templateUrl: 'slide.delete.component.html',
  })
  export class SlideDeleteComponent {

    constructor(
      public dialogRef: MatDialogRef<SlideDeleteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
      console.log(this.data);
      this.dialogRef.close();
    }
  }