import { Component, Inject, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'app-news-news-delete-component',
    templateUrl: 'news.news.delete.component.html',
  })
  export class NewsNewsDeleteComponent {

    constructor(
      public dialogRef: MatDialogRef<NewsNewsDeleteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
      debugger;
      console.log(this.data);
      this.dialogRef.close();
    }
  }