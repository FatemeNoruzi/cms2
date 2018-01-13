import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';

import {UsersDeleteComponent} from './dialogComponent/usersDelete/users.delete.component';
import {UsersSearchComponent} from './dialogComponent/usersSearch/users.search.component';

import {UsersRevokeSearchComponent} from './usersRevoke/dialogComponent/usersRevokeSearch/users.revoke.search.component';

import {UsersRevokeComponent} from './usersRevoke/users.revoke.component';
import {UsersRevokeRequestComponent} from './usersRevokeRequest/users.revoke.request.component';
import {UsersNocodeComponent} from './usersNocode/users.nocode.component';

import {UsersRevokeRequestSearchComponent} from
 './usersRevokeRequest/dialogComponent/usersRevokeRequestSearch/users.revoke.request.search.component';
import {UsersRevokeRequestDeleteComponent} from
 './usersRevokeRequest/dialogComponent/usersRevokeRequestDelete/users.revoke.request.delete.component';
 import {UsersNocodeSearchComponent} from
 './usersNocode/dialogComponent/usersNocodeSearch/users.nocode.search.component';



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
  {path: 'index' , component: UsersComponent},
  {path: 'revoke' , component: UsersRevokeComponent},
  {path: 'revoke-request' , component: UsersRevokeRequestComponent},
  {path: 'nocode' , component: UsersNocodeComponent}
];

@NgModule({
  declarations: [UsersComponent, UsersDeleteComponent, UsersSearchComponent, UsersRevokeSearchComponent, UsersRevokeComponent,
    UsersRevokeRequestSearchComponent , UsersRevokeRequestDeleteComponent, UsersRevokeRequestComponent, UsersNocodeComponent, 
    UsersNocodeSearchComponent
  ],
  entryComponents: [UsersDeleteComponent, UsersSearchComponent, UsersRevokeSearchComponent,
     UsersRevokeRequestSearchComponent , UsersRevokeRequestDeleteComponent, UsersNocodeSearchComponent],
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


export class UsersModule {}
