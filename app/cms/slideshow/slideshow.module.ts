import { NgModule, Component} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { SlideshowDetailComponent } from './detail/slideshow.detail.component';
import { SlideshowAddComponent } from './add/slideshow.add.component';
import { SlideshowEditComponent } from './edit/slideshow.edit.component';
import { SlideshowComponent } from './slideshow.component';
import { NgSwitch } from '@angular/common';
import {SlideshowDeleteComponent} from './dialogComponent/slideshow.delete/slideshow.delete.component';
import {SlideAddComponent} from './edit/dialogComponent/slideAdd/slide.add.component';
import {SlideDeleteComponent} from './edit/dialogComponent/slideDelete/slide.delete.component';
import {SlideUpdateComponent} from './edit/dialogComponent/slideUpdate/slide.update.component';
import {PagingModule} from '../paging/paging.module';

// import { Http, RequestOptions , Headers } from '@angular/http';
import { HttpService } from '../../util/decomService.component';
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
MdChipsModule, MdCheckboxModule, MdDialogModule, MdRadioModule, MdSnackBarModule, MdSelectModule,
MdAutocompleteModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: '' , redirectTo : 'index' , pathMatch: 'full'},
  {path: 'index' , component: SlideshowComponent},
  {path: 'detail/:id' , component: SlideshowDetailComponent},
  {path: 'edit/:id' , component: SlideshowEditComponent},
  {path: 'add' , component: SlideshowAddComponent},
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
  declarations: [ SlideshowDeleteComponent, SlideshowComponent, SlideshowDetailComponent,
    SlideshowAddComponent, SlideshowEditComponent, SlideAddComponent, SlideDeleteComponent,
    SlideUpdateComponent
  ],
  entryComponents: [ SlideshowDeleteComponent, SlideAddComponent, SlideDeleteComponent, SlideUpdateComponent],
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
    ReactiveFormsModule,
    MdRadioModule,
    MdSnackBarModule,
    MdSelectModule,
    MdAutocompleteModule,
    HttpModule,
    MainPipe,
    PagingModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
  ],
  providers: [],
})


export class SlideshowModule {}
