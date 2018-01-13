import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { CMSComponent } from './cms.component';

// import { CanDeactivateGuard }       from './can-deactivate-guard.service';
// import { AuthGuard }                from './auth-guard.service';
// import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const routes: Routes = [
    {path: '' , redirectTo : 'cms' , pathMatch: 'full'},
    {path: 'cms'      , component: CMSComponent,
    children: [
      {path: 'news'     , loadChildren: './news/news.module#NewsModule' },
      {path: 'chart'     , loadChildren: './chart/chart.module#ChartModule' },
      {path: 'setting' , loadChildren: './setting/setting.module#SettingModule'},
      {path: 'education' , loadChildren: './education/education.module#EducationModule'},
      {path: 'message' , loadChildren: './message/message.module#MessageModule'},
      {path: 'users' , loadChildren: './users/users.module#UsersModule'},
      {path: 'discontent' , loadChildren: './discontent/discontent.module#DiscontentModule'},
      {path: 'filemanager' , loadChildren: './filemanager/file.manager.module#FileManagerModule'},
      {path: 'slideshow' , loadChildren: './slideshow/slideshow.module#SlideshowModule'},
      {path: 'spotlight' , loadChildren: './spotlight/spotlight.module#SpotlightModule'}
    ] },
    // {path: 'account' , loadChildren: './account/account.module#AccountModule'},
    // {path: 'home'     , loadChildren: './app.module#AppModule' },
    // {path: 'news'     , loadChildren: './news/news.module#NewsModule' },
    // {path: 'chart'     , loadChildren: './chart/chart.module#ChartModule' },
    // {path: 'setting' , loadChildren: './setting/setting.module#SettingModule'},
    // {path: 'education' , loadChildren: './education/education.module#EducationModule'},
    // {path: 'message' , loadChildren: './message/message.module#MessageModule'},
    // {path: 'users' , loadChildren: './users/users.module#UsersModule'},
    // {path: 'discontent' , loadChildren: './discontent/discontent.module#DiscontentModule'},

  ];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class CMSRoutingModule {
}