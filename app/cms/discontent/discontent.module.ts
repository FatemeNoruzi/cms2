import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DiscontentComponent } from './discontent.component';

import {DiscontentDeleteComponent} from './dialogComponent/discontentDelete/discontent.delete.component';
import {DiscontentSearchComponent} from './dialogComponent/discontentSearch/discontent.search.component';


import 'hammerjs';
import {Http} from '@angular/http';

import {
MdSidenavModule, MdIconModule, MdButtonModule,
MdExpansionModule, MdMenuModule, MdListModule, MdFormFieldModule, MatFormFieldModule,
MdInputModule, MatInputModule, MdTableModule, MdSortModule, MdPaginatorModule,
MdChipsModule, MdCheckboxModule, MdDialogModule, MdRadioModule, MdTabsModule, MdSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: '' , redirectTo : 'index' , pathMatch: 'full'},
  {path: 'index' , component: DiscontentComponent}
];

@NgModule({
  declarations: [DiscontentComponent, DiscontentDeleteComponent, DiscontentSearchComponent
  ],
  entryComponents: [DiscontentDeleteComponent, DiscontentSearchComponent],
  imports: [
    CommonModule,
    RouterModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdExpansionModule,
    MdMenuModule,
    MdListModule,
    MdFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MdInputModule,
    MdTableModule,
    MdSortModule,
    MdPaginatorModule,
    MdCheckboxModule,
    MdChipsModule,
    CdkTableModule,
    MdDialogModule,
    FormsModule,
    MdRadioModule,
    MdTabsModule,
    MdSelectModule,
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [],
})


export class DiscontentModule {}
