import { BrowserModule } from '@angular/platform-browser';
import { RecaptchaModule } from 'ng2-recaptcha';
import { Http, RequestOptions , Headers } from '@angular/http';
import { TreeModule } from 'ng2-tree';
import { NgModule } from '@angular/core';
import { HttpService } from './util/decomService.component';
import { HttpService1 } from './util/decomService.component.1';
import { Message } from './model/message';
import { NgSwitch } from '@angular/common';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import {
MdSidenavModule, MdIconModule, MdButtonModule,
MdExpansionModule, MdMenuModule, MdListModule, MdFormFieldModule,
MdInputModule, MdTableModule, MdSortModule, MdPaginatorModule,
MdCheckboxModule, MatButtonModule, MdChipsModule, MdDialogModule,
MdSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {FileManagerComponent} from './cms/filemanager/file.manager.component';




@NgModule({
  declarations: [
    AppComponent ],
  imports: [
    BrowserModule,
    RecaptchaModule.forRoot(),
    HttpModule,
    // TreeModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MatButtonModule,
    MdExpansionModule,
    MdMenuModule,
    MdListModule,
    MdFormFieldModule,
    MdInputModule,
    MdTableModule,
    MdSortModule,
    MdDialogModule,
    MdPaginatorModule,
    MdCheckboxModule,
    MdChipsModule,
    MdSelectModule,
    CdkTableModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
