import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import 'hammerjs';
import {
  MdSidenavModule, MdIconModule, MdButtonModule,
  MdExpansionModule, MdMenuModule, MdListModule, MdFormFieldModule,
  MdInputModule, MdTableModule, MdSortModule, MdPaginatorModule,
  MdCheckboxModule
  } from '@angular/material';
  import {FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '' , redirectTo : 'index' , pathMatch: 'full'},
  {path: 'index' , component: CommentComponent}
];

@NgModule({
  declarations: [CommentComponent],
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
    MdInputModule,
    MdTableModule,
    MdSortModule,
    MdPaginatorModule,
    MdCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})


export class CommentModule {}
