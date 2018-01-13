import { Component, Inject, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'app-spotlight-delete-component',
    templateUrl: 'spotlight.delete.component.html',
  })
  export class SpotlightDeleteComponent {

    constructor(
      public dialogRef: MatDialogRef<SpotlightDeleteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
      console.log(this.data);
      this.dialogRef.close();
    }
  }