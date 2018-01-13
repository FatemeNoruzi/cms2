import { Component, Inject, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
@Component ({
  selector: 'app-origin-settings' ,
  templateUrl: './origin.settings.component.html' ,
  styleUrls: ['./origin.settings.component.css']
})
export class OriginSettingsComponent {

  chipValue: string;
  chips = [
    'Apple',
    'Orange',
    'Banana',
    'Mango',
    'Cherry'
  ]

  remove(item){
    this.chips.splice(item, 1);
  }

  add(value){
    // console.log(value);
    this.chips.push(value);
    this.chipValue = "";
  }
  
  removeByKey(value){
    // console.log(event)
    if(value.length < 1){
      if(this.chips.length > 0){
        this.chips.pop();
      }
    }
  }

}
