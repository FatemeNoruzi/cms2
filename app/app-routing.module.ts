import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';

// import { CanDeactivateGuard }       from './can-deactivate-guard.service';
// import { AuthGuard }                from './auth-guard.service';
// import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const routes: Routes = [
    {path: '' , redirectTo : 'login' , pathMatch: 'full'},
    {path: 'login'     , loadChildren: './login/login.module#LogInModule' },
    {path: 'cms'     , loadChildren: './cms/cms.module#CMSModule' }

  ];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule {
}