import { Component, Inject, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'app-message-delete-component',
    templateUrl: 'message.delete.component.html',
  })
  export class MessageDeleteComponent {
    constructor(
      public dialogRef: MatDialogRef<MessageDeleteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
      debugger;
      console.log(this.data);
      this.dialogRef.close();
    }
  }