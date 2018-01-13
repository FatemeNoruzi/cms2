import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SettingsiteComponent } from './settingsite/settingsite.component';
import { GraphicSettingsComponent } from './graphicSettings/graphic.settings.component';
import { MenuSettingsComponent } from './menuSettings/menu.settings.component';
import { GeneralSettingsComponent } from './settingsite/components/generalSettings/general.settings.component';
import { OriginSettingsComponent } from './settingsite/components/originSettings/origin.settings.component';
import { OtherSettingsComponent } from './settingsite/components/otherSettings/other.settings.component';
import { ContentSettingsComponent } from './settingsite/components/contentSettings/content.settings.component';
import {
MdGridListModule, MdIconModule , MdTabsModule, MdFormFieldModule,
MdInputModule, MdButtonModule, MdCheckboxModule, MdChipInputEvent, MdChipsModule, MdDatepickerModule,
MdNativeDateModule
} from '@angular/material';
import 'hammerjs';
import {} from '@angular/material';
// Import NgbModule library Date picker
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {CdkTableModule} from '@angular/cdk/table';
import {CKEditorModule} from 'ng2-ckeditor';
import { TreeModule } from 'ng2-tree';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

const routes: Routes = [
  {path: '' , redirectTo : 'index'},
  {path: 'index' , component: SettingComponent},
  {path: 'site' , component: SettingsiteComponent},
  {path: 'graphic' , component: GraphicSettingsComponent},
  {path: 'menu' , component: MenuSettingsComponent}
];

@NgModule({
  declarations: [SettingComponent, SettingsiteComponent,
     GeneralSettingsComponent, OriginSettingsComponent,
     OtherSettingsComponent, ContentSettingsComponent
    , GraphicSettingsComponent, MenuSettingsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MdGridListModule,
    MdIconModule,
    MdTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    CKEditorModule,
    TreeModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  bootstrap: [SettingComponent],
  providers: [],
})


export class SettingModule {}
platformBrowserDynamic().bootstrapModule(SettingModule);