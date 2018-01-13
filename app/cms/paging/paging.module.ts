import { NgModule } from '@angular/core';
import { PagingComponent } from './paging.component';
import { CommonModule, DatePipe } from '@angular/common';
import {
    MdSidenavModule, MdIconModule, MdButtonModule,
    MdExpansionModule, MdMenuModule, MdListModule, MdFormFieldModule, MatFormFieldModule,
    MdInputModule, MatInputModule, MdTableModule, MdSortModule, MdPaginatorModule,
    MdChipsModule, MdCheckboxModule, MdDialogModule, MdRadioModule, MdSnackBarModule,
    MdSelectModule
    } from '@angular/material';

@NgModule({
  declarations: [
    PagingComponent
  ],
  imports: [
    CommonModule,
    MdSidenavModule, MdIconModule, MdButtonModule,
    MdExpansionModule, MdMenuModule, MdListModule, MdFormFieldModule, MatFormFieldModule,
    MdInputModule, MatInputModule, MdTableModule, MdSortModule, MdPaginatorModule,
    MdChipsModule, MdCheckboxModule, MdDialogModule, MdRadioModule, MdSnackBarModule,
    MdSelectModule,
  ],
  exports: [
    PagingComponent
  ]
})
export class PagingModule {}