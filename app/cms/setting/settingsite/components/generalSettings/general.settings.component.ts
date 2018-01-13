import { Component, Inject, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
@Component ({
  selector: 'app-general-settings' ,
  templateUrl: './general.settings.component.html' ,
  styleUrls: ['./general.settings.component.css']
})
export class GeneralSettingsComponent {
  content= '';

  constructor() {
  this.content = `<p>My HTML</p>`;
  }

}
