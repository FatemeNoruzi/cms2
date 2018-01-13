import { NgModule, Component} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { SpotlightComponent } from './spotlight.component';
import { NgSwitch } from '@angular/common';
import {SpotlightDeleteComponent} from './dialogComponent/spotlightDelete/spotlight.delete.component';
import {NewsNewsSearchComponent} from './dialogComponent/newsNewsSearch/news.news.search.component';
import {SpotlightAddComponent} from './spotlightAdd/spotlight.add.component';
import {SpotlightEditComponent} from './spotlightEdit/spotlight.edit.component';
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
MdTabsModule, MdSelectModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: '' , redirectTo : 'index' , pathMatch: 'full'},
  {path: 'index' , component: SpotlightComponent},
  { path: 'add', component: SpotlightAddComponent },
  { path: 'edit/:id', component: SpotlightEditComponent },
];

@NgModule({
  declarations: [SpotlightComponent, SpotlightDeleteComponent , SpotlightAddComponent,
    SpotlightEditComponent
  ],
  entryComponents: [ SpotlightDeleteComponent ],
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
    MdTabsModule,
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


export class SpotlightModule {}
