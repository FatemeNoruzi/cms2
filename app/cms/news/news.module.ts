import { NgModule, Component} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsComponent } from './news.component';
import {NewsNewsComponent} from './newsNews/news.news.component';
import {NewsNoticeComponent} from './newsNotice/news.notice.component';
import {NewsPublishComponent} from './newsPublish/news.publish.component';
import {NewsNewsSearchComponent} from './dialogComponent/newsNewsSearch/news.news.search.component';

import {NewsNewsDeleteComponent} from './dialogComponent/newsNewsDelete/news.news.delete.component';
import {NewsNewsAddComponent} from './newsNews/newsNewsAdd/news.news.add.component';
import {NewsEditComponent} from './newsNews/newsEdit/news.edit.component';

import {NewsPublishAddComponent} from './newsNews/newsPublishAdd/news.publish.add.component';
import {NewsNoticeAddComponent} from './newsNews/newsNoticeAdd/news.notice.add.component';
// import { Http, RequestOptions , Headers } from '@angular/http';
import { HttpService } from '../../util/decomService.component';
import { News } from '../../model/news';
import { FilterType, ServerError } from '../../util/enums';
import { Item } from '../../model/item';
import { FilterColl, Filter } from '../../model/filter';

import 'hammerjs';

import {
MdSidenavModule, MdIconModule, MdButtonModule,
MdExpansionModule, MdMenuModule, MdListModule, MdFormFieldModule, MatFormFieldModule,
MdInputModule, MatInputModule, MdTableModule, MdSortModule, MdPaginatorModule,
MdChipsModule, MdCheckboxModule, MdDialogModule, MdRadioModule, MdSnackBarModule
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
  {path: 'index' , component: NewsComponent},
  {path: 'news' ,
  children: [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: NewsNewsComponent },
    { path: 'edit/:id', component: NewsEditComponent },
    {path: 'add-news' , component: NewsNewsAddComponent},
  ]},
  {path: 'notice' , component: NewsNoticeComponent},
  {path: 'publish' , component: NewsPublishComponent},
  {path: 'add-publish' , component: NewsPublishAddComponent},
  {path: 'add-notice' , component: NewsNoticeAddComponent}
];

@NgModule({
  declarations: [NewsComponent, NewsNewsComponent,
     NewsNewsDeleteComponent, NewsNewsAddComponent,
    NewsPublishAddComponent, NewsNoticeAddComponent, NewsNewsSearchComponent,
    NewsNoticeComponent, NewsPublishComponent, NewsEditComponent
  ],
  entryComponents: [NewsNewsDeleteComponent, NewsNewsSearchComponent],
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
    HttpModule,
    MainPipe,
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [],
})


export class NewsModule {}
