import { Component, Inject, EventEmitter } from '@angular/core';
// import { BaseComponent } from '../util/base.component';
import {FormControl, Validators} from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MatFormField, MatButton, MatInput} from '@angular/material';
@Component ({
  selector: 'app-dialog' ,
  templateUrl: './dialog.component.html' ,
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  onAdd = new EventEmitter();
  constructor(
    public dialogRef: MdDialogRef<DialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.onAdd.emit('test');
    this.dialogRef.close(this.data.animal);
  }
  // this.dialogRef.afterClosed().subscribe(result => {
  //   debugger;
  //   console.log('The dialog was closed');
  //   this.animal = result;
  // });
}
