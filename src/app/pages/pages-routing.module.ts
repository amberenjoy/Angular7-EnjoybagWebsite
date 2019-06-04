import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth.guard';
import { IndexComponent } from './index/index.component';
import { IndexTcComponent } from './index-tc/index-tc.component';
import { LandingComponent } from './landing/landing.component';
import { LandingTcComponent } from './landing-tc/landing-tc.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileTcComponent } from './user-profile-tc/user-profile-tc.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';
import { UserRegisterPageTcComponent } from './user-register-page-tc/user-register-page-tc.component';
import { FaqComponent } from './faq/faq.component';
import { FaqTcComponent } from './faq-tc/faq-tc.component';

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
        path: 'myEnjoybag', component: UserProfileComponent, canActivate: [AuthGuard]
      },
      {
        path: 'FAQ', component: FaqComponent, loadChildren: '../faq-page/faq-page.module#FaqPageModule'
      },
      {
        path: 'brand', loadChildren: '../brand-page/brand-page.module#BrandPageModule'
      },
      {
        path: 'products', loadChildren: '../handbags/handbags.module#HandbagsModule'
      },
      {
        path: 'checkout', loadChildren: '../checkout-pages/checkout-pages.module#CheckoutPagesModule'
      }
    ]
  },
  {
    path: 'tc', component: IndexTcComponent,
    children: [
      {
        path: 'home', component: LandingTcComponent
      },
      {
        path: 'register', component: UserRegisterPageTcComponent
      },
      {
        path: 'myEnjoybag', component: UserProfileTcComponent, canActivate: [AuthGuard]
      },
      {
        path: 'products', loadChildren: '../handbags-tc/handbags-tc.module#HandbagsTcModule'
      },
      {
        path: 'FAQ', component: FaqTcComponent, loadChildren: '../faq-page/faq-page.module#FaqPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
