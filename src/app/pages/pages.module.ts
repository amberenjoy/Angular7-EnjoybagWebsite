/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-10-15 10:51:41
 * @LastEditors: Please set LastEditors
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { fakeBackendProvider } from '../helpers/fake-backend';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './../helpers/jwt.interceptor';
import { ErrorInterceptor } from './../helpers/error.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LandingComponent } from './landing/landing.component';
import { IndexComponent } from './index/index.component';
import { IndexTcComponent } from './index-tc/index-tc.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderTcComponent } from './layout/header-tc/header-tc.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FooterTcComponent } from './layout/footer-tc/footer-tc.component';
import { ContactComponent } from './layout/contact/contact.component';
import { ContactTcComponent } from './layout/contact-tc/contact-tc.component';
import { UserCartComponent } from './layout/user-cart/user-cart.component';
import { UserCartTcComponent } from './layout/user-cart-tc/user-cart-tc.component';
import { UserLoginComponent } from './layout/user-login/user-login.component';
import { UserLoginTcComponent } from './layout/user-login-tc/user-login-tc.component';
import { UserRegisterComponent } from './layout/user-register/user-register.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';
import { UserRegisterTcComponent } from './layout/user-register-tc/user-register-tc.component';
import { FaqComponent } from './faq/faq.component';
import { FaqTcComponent } from './faq-tc/faq-tc.component';
import { DialogComponent } from './layout/dialog/dialog.component';
import { PasswordPageComponent } from './password-page/password-page.component';
import { UserResetComponent } from './layout/user-reset/user-reset.component';

import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider
} from 'angularx-social-login';

import { PageNotFoundComponent } from '.././page-not-found/page-not-found.component';
import { HeaderMobileComponent } from './layout/header-mobile/header-mobile.component';
import { HeaderMobileSidenavComponent } from './layout/header-mobile-sidenav/header-mobile-sidenav.component';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1032790253567506')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    LandingComponent,
    IndexComponent,
    IndexTcComponent,
    HeaderComponent,
    HeaderTcComponent,
    FooterComponent,
    FooterTcComponent,
    ContactComponent,
    ContactTcComponent,
    UserCartComponent,
    UserCartTcComponent,
    UserRegisterComponent,
    UserRegisterTcComponent,
    UserLoginComponent,
    UserLoginTcComponent,
    UserRegisterPageComponent,
    FaqComponent,
    FaqTcComponent,
    DialogComponent,
    PasswordPageComponent,
    UserResetComponent,
    PageNotFoundComponent,
    HeaderMobileComponent,
    HeaderMobileSidenavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    SocialLoginModule,
    FontAwesomeModule
  ],
  exports: [ContactComponent, ContactTcComponent],
  providers: [
    // fakeBackendProvider,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: AuthServiceConfig, useFactory: provideConfig }
  ],
  entryComponents: [DialogComponent, UserLoginComponent, UserRegisterComponent]
})
export class PagesModule { }
