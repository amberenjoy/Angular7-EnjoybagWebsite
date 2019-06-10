import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { fakeBackendProvider } from '../helper/fake-backend';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './../helper/jwt.interceptor';
import { ErrorInterceptor } from './../helper/error.interceptor';
import { SharedModule } from '../shared/shared.module';

import { LandingComponent } from './landing/landing.component';
import { LandingTcComponent } from './landing-tc/landing-tc.component';
import { IndexComponent } from './index/index.component';
import { IndexTcComponent } from './index-tc/index-tc.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderTcComponent } from './layout/header-tc/header-tc.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FooterTcComponent } from './layout/footer-tc/footer-tc.component';
import { ContactComponent } from './layout/contact/contact.component';
import { ContactTcComponent } from './layout/contact-tc/contact-tc.component';
import { SearchComponent } from './layout/search/search.component';
import { SearchTcComponent } from './layout/search-tc/search-tc.component';
import { UserCartComponent } from './layout/user-cart/user-cart.component';
import { UserCartTcComponent } from './layout/user-cart-tc/user-cart-tc.component';
import { UserLoginComponent } from './layout/user-login/user-login.component';
import { UserLoginTcComponent } from './layout/user-login-tc/user-login-tc.component';
import { UserRegisterComponent } from './layout/user-register/user-register.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileTcComponent } from './user-profile-tc/user-profile-tc.component';
import { UserRegisterTcComponent } from './layout/user-register-tc/user-register-tc.component';
import { UserRegisterPageTcComponent } from './user-register-page-tc/user-register-page-tc.component';
import { FaqComponent } from './faq/faq.component';
import { FaqTcComponent } from './faq-tc/faq-tc.component';

@NgModule({
  declarations: [
    LandingComponent, LandingTcComponent,
    IndexComponent, IndexTcComponent,
    HeaderComponent, HeaderTcComponent,
    FooterComponent, FooterTcComponent,
    ContactComponent, ContactTcComponent,
    SearchComponent, SearchTcComponent,
    UserCartComponent, UserCartTcComponent,
    UserProfileComponent, UserProfileTcComponent,
    UserRegisterPageComponent, UserRegisterComponent,
    UserLoginComponent, UserLoginTcComponent,
    UserRegisterTcComponent, UserRegisterPageTcComponent,
    FaqComponent, FaqTcComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ContactComponent, ContactTcComponent
  ],
  providers: [
    SharedModule,
    fakeBackendProvider,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class PagesModule { }