/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-10-11 15:49:01
 * @LastEditors: Please set LastEditors
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth.guard';
import { IndexComponent } from './index/index.component';
import { LandingComponent } from './landing/landing.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';
import { FaqComponent } from './faq/faq.component';
import { PasswordPageComponent } from './password-page/password-page.component';
import { UserResetComponent } from './layout/user-reset/user-reset.component';
import { PageNotFoundComponent } from '.././page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'en', component: IndexComponent,
    children: [
      {
        path: 'home', component: LandingComponent,
      },
      {
        path: 'register', component: UserRegisterPageComponent
      },
      {
        path: 'forgot-password', component: PasswordPageComponent
      },
      {
        path: 'reset-password/:token', component: UserResetComponent
      },
      {
        path: 'myEnjoybag', canActivate: [AuthGuard], loadChildren: '../user-pages/user-pages.module#UserPagesModule'
      },
      {
        path: 'FAQ', component: FaqComponent, loadChildren: '../faq-page/faq-page.module#FaqPageModule'
      },
      {
        path: 'brand', loadChildren: '../brand-pages/brand-pages.module#BrandPagesModule'
      },
      {
        path: 'products', loadChildren: '../handbags/handbags.module#HandbagsModule'
      },
    ]
  },
  {
    path: 'en',
    children: [
      { path: 'checkout', loadChildren: '../checkout-pages/checkout-pages.module#CheckoutPagesModule' }
    ]
  },
  // {
  //   path: 'tc', component: IndexTcComponent,
  //   // children: [
  //   //   {
  //   //     path: 'home', component: LandingTcComponent
  //   //   },
  //   //   {
  //   //     path: 'register', component: UserRegisterPageTcComponent
  //   //   },

  //   //   {
  //   //     path: 'products', loadChildren: '../handbags-tc/handbags-tc.module#HandbagsTcModule'
  //   //   },
  //   //   {
  //   //     path: 'FAQ', component: FaqTcComponent, loadChildren: '../faq-pages-tc/faq-pages-tc.module#FaqPagesTcModule'
  //   //   },
  //   //   {
  //   //     path: 'checkout', loadChildren: '../checkout-pages-tc/checkout-pages-tc.module#CheckoutPagesTcModule'
  //   //   },
  //   //   {
  //   //     path: 'brand', loadChildren: '../brand-pages/brand-pages.module#BrandPagesModule'
  //   //   }
  //   // ]

  //   children: [
  //     {
  //       path: 'home', component: LandingComponent,
  //     },
  //     {
  //       path: 'register', component: UserRegisterPageComponent
  //     },
  //     {
  //       path: 'forgot-password', component: PasswordPageComponent
  //     },
  //     {
  //       path: 'reset-password/:token', component: UserResetComponent
  //     },
  //     {
  //       path: 'myEnjoybag', canActivate: [AuthGuard], loadChildren: '../user-pages/user-pages.module#UserPagesModule'
  //     },
  //     {
  //       path: 'FAQ', component: FaqComponent, loadChildren: '../faq-page/faq-page.module#FaqPageModule'
  //     },
  //     {
  //       path: 'brand', loadChildren: '../brand-pages/brand-pages.module#BrandPagesModule'
  //     },
  //     {
  //       path: 'products', loadChildren: '../handbags/handbags.module#HandbagsModule'
  //     },
  //   ]
  // },
  // {
  //   path: 'tc',
  //   children: [
  //     { path: 'checkout', loadChildren: '../checkout-pages/checkout-pages.module#CheckoutPagesModule' }
  //   ]
  // },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
