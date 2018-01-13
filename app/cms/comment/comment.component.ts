import { Component } from '@angular/core';
// import { BaseComponent } from '../util/base.component';
import {FormControl, Validators} from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component ({
  selector: 'app-comment' ,
  templateUrl: './comment.component.html' ,
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

}
