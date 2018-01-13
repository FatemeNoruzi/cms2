import { CommonModule, DatePipe } from '@angular/common';
import { Http, RequestOptions , Headers } from '@angular/http';
import { TreeModule } from 'ng2-tree';
import { NgModule } from '@angular/core';
import { HttpService } from '../util/decomService.component';
import { HttpService1 } from '../util/decomService.component.1';
import { Message } from '../model/message';

import { CMSComponent } from './cms.component';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import {
MdSidenavModule, MdIconModule, MdButtonModule,
MdExpansionModule, MdMenuModule, MdListModule, MdFormFieldModule,
MdInputModule, MdTableModule, MdSortModule, MdPaginatorModule,
MdCheckboxModule, MatButtonModule, MdChipsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { CMSRoutingModule } from './cms-routing.module';
// import {NewsModule} from './news/news.module';
import {NewsComponent} from './news/news.component';
import {UsersComponent} from './users/users.component';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';




@NgModule({
  declarations: [
    CMSComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    // TreeModule,
    RouterModule,
    CMSRoutingModule,
    // BrowserAnimationsModule,
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
    MdPaginatorModule,
    MdCheckboxModule,
    MdChipsModule,
    CdkTableModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
  ],
  providers: [HttpService , HttpService1],
})
export class CMSModule { }
