import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';

import 'hammerjs';
import {
MdSidenavModule, MdIconModule, MdButtonModule,
MdExpansionModule, MdMenuModule, MdListModule, MdFormFieldModule,
MdInputModule, MdTableModule, MdSortModule, MdPaginatorModule,
MdCheckboxModule, MdDialogModule

} from '@angular/material';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';


// Import NgbModule library Date picker
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// chart
import { ChartsModule } from 'ng2-charts';

import {CdkTableModule} from '@angular/cdk/table';

const routes: Routes = [
  {path: '' , redirectTo : 'index' , pathMatch: 'full'},
  {path: 'index' , component: ChartComponent}
];

@NgModule({
  declarations: [ChartComponent],
  // entryComponents: [DialogComponent],
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
    MdDialogModule,
    FormsModule,
    ChartsModule,
    // Specify NgbModule library as an import
    NgbModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [],
})


export class ChartModule {}
