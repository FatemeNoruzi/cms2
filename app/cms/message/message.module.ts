import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { MessageAddComponent } from './messageAdd/message.add.component';
import { MessageEditComponent } from './messageEdit/message.edit.component';

import {MessageDeleteComponent} from './dialogComponent/messageDelete/message.delete.component';
import {MessageSearchComponent} from './dialogComponent/messageSearch/message.search.component';
import {PagingModule} from '../paging/paging.module';


import 'hammerjs';
import {Http} from '@angular/http';

import {
MdSidenavModule, MdIconModule, MdButtonModule,
MdExpansionModule, MdMenuModule, MdListModule, MdFormFieldModule, MatFormFieldModule,
MdInputModule, MatInputModule, MdTableModule, MdSortModule, MdPaginatorModule, MdSnackBarModule,
MdChipsModule, MdCheckboxModule, MdDialogModule, MdRadioModule, MdTabsModule, MdSelectModule,
MdTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MainPipe } from '../../util/main.pipe.module';



const routes: Routes = [
  {path: '' , redirectTo : 'index' , pathMatch: 'full'},
  {path: 'index' , component: MessageComponent},
  {path: 'add' , component: MessageAddComponent},
  { path: 'edit/:id', component: MessageEditComponent },
];

@NgModule({
  declarations: [MessageComponent, MessageEditComponent, MessageDeleteComponent, MessageSearchComponent, MessageAddComponent
  ],
  entryComponents: [MessageDeleteComponent, MessageSearchComponent],
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
    MdTooltipModule,
    CdkTableModule,
    MdDialogModule,
    FormsModule,
    MdRadioModule,
    MdTabsModule,
    MdSelectModule,
    MdSnackBarModule,
    PagingModule,
    MainPipe,
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [],
})


export class MessageModule {}
