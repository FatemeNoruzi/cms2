import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import 'hammerjs';
import {Http} from '@angular/http';

import {EducationMeetingComponent} from './educationMeeting/education.meeting.component';
import {EducationMeetingDeleteComponent} 
from './educationMeeting/dialogComponent/educationMeetingDelete/education.meeting.delete.component';
import {EducationMeetingSearchComponent}
 from './educationMeeting/dialogComponent/educationMeetingSearch/education.meeting.search.component';
import {EducationMeetingAddComponent} from './educationMeeting/educationMeetingAdd/education.meeting.add.component';

import {EducationGatheringComponent} from './educationGathering/education.gathering.component';
import {EducationGatheringDeleteComponent} 
from './educationGathering/dialogComponent/educationGatheringDelete/education.gathering.delete.component';
import {EducationGatheringSearchComponent}
 from './educationGathering/dialogComponent/educationGatheringSearch/education.gathering.search.component';
import {EducationGatheringAddComponent} from './educationGathering/educationGatheringAdd/education.gathering.add.component';


import {
MdSidenavModule, MdIconModule, MdButtonModule,
MdExpansionModule, MdMenuModule, MdListModule, MdFormFieldModule, MatFormFieldModule,
MdInputModule, MatInputModule, MdTableModule, MdSortModule, MdPaginatorModule,
MdChipsModule, MdCheckboxModule, MdDialogModule, MdRadioModule, MdTabsModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: '' , redirectTo : 'index' , pathMatch: 'full'},
  {path: 'index' , component: EducationComponent},
  {path: 'meeting' ,
  children: [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: EducationMeetingComponent },
    { path: 'add', component: EducationMeetingAddComponent }
  ]},
  {path: 'gathering' ,
  children: [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: EducationGatheringComponent },
    { path: 'add', component: EducationGatheringAddComponent }
  ]}
  // {path: 'gathering' , component: EducationGatheringComponent},
  // {path: 'cours' , component: EducationCoursComponent},
];

@NgModule({
  declarations: [EducationComponent, EducationMeetingComponent,
    EducationMeetingDeleteComponent, EducationMeetingSearchComponent, EducationMeetingAddComponent, EducationGatheringComponent, 
    EducationGatheringDeleteComponent, EducationGatheringSearchComponent, EducationGatheringAddComponent
  ],
  entryComponents: [ EducationMeetingDeleteComponent, EducationMeetingSearchComponent,
    EducationGatheringDeleteComponent, EducationGatheringSearchComponent],
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
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [],
})


export class EducationModule {}
