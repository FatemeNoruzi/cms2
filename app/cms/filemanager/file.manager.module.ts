import { NgModule, Component} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FileManagerComponent } from './file.manager.component';
import { NgSwitch } from '@angular/common';
import {FileDeleteComponent} from './dialogComponent/fileDelete/file.delete.component';
import {NewsNewsSearchComponent} from './dialogComponent/newsNewsSearch/news.news.search.component';
import {UpdateFileComponent} from './dialogComponent/updateFile/update.file.component';
import {UploadFileComponent} from './dialogComponent/uploadFile/upload.file.component';
import {PagingModule} from '../paging/paging.module';

// import { Http, RequestOptions , Headers } from '@angular/http';
import { HttpService } from '../../util/decomService.component';
import { HttpService1 } from '../../util/decomService.component.1';
import { News } from '../../model/news';
import { FilterType, ServerError } from '../../util/enums';
import { Item } from '../../model/item';
import { FilterColl, Filter } from '../../model/filter';
import { MainPipe } from '../../util/main.pipe.module';

import 'hammerjs';

import {
MdSidenavModule, MdIconModule, MdButtonModule,
MdExpansionModule, MdMenuModule, MdListModule, MdFormFieldModule, MatFormFieldModule,
MdInputModule, MatInputModule, MdTableModule, MdSortModule, MdPaginatorModule,
MdChipsModule, MdCheckboxModule, MdDialogModule, MdRadioModule, MdSnackBarModule,
MdSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: '' , redirectTo : 'index' , pathMatch: 'full'},
  {path: 'index' , component: FileManagerComponent}
];
//   {path: 'news' ,
//   children: [
//     { path: '', redirectTo: 'index', pathMatch: 'full' },
//     { path: 'index', component: NewsNewsComponent },
//     { path: 'edit/:id', component: NewsEditComponent },
//     {path: 'add-news' , component: NewsNewsAddComponent},
//   ]},
//   {path: 'notice' , component: NewsNoticeComponent},
//   {path: 'publish' , component: NewsPublishComponent},
//   {path: 'add-publish' , component: NewsPublishAddComponent},
//   {path: 'add-notice' , component: NewsNoticeAddComponent}
// ];

@NgModule({
  declarations: [FileManagerComponent, UpdateFileComponent, UploadFileComponent, FileDeleteComponent
  ],
  entryComponents: [ UpdateFileComponent, UploadFileComponent , FileDeleteComponent],
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
    MdSnackBarModule,
    MdSelectModule,
    HttpModule,
    MainPipe,
    PagingModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
  ],
  providers: [],
})


export class FileManagerModule {}
