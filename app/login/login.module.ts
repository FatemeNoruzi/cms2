import { CommonModule} from '@angular/common';
import { Http, RequestOptions , Headers } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CMSModule } from '../cms/cms.module';


import { LogInComponent } from './login.component';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import {
MdSidenavModule, MdIconModule, MdButtonModule,
MdExpansionModule, MdMenuModule, MdListModule, MdFormFieldModule,
MdInputModule, MdTableModule, MdSortModule, MdPaginatorModule,
MdCheckboxModule, MatButtonModule, MdChipsModule
} from '@angular/material';

const routes1: Routes = [
  {path: '' , redirectTo : 'index' , pathMatch: 'full'},
  {path: 'index' , component: LogInComponent},
  {path: 'cms' , loadChildren: '../cms/cms.module#CMSModule'}
];


@NgModule({
  declarations: [
    LogInComponent
  ],
  imports: [
    CommonModule,
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
    RouterModule.forChild(routes1)
  ],
  bootstrap: [LogInComponent]
})
export class LogInModule { }
