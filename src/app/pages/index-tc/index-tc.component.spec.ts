
/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-10-02 17:31:17
 * @LastEditors: Please set LastEditors
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTcComponent } from './index-tc.component';
import { HeaderMobileSidenavComponent } from './../layout/header-mobile-sidenav/header-mobile-sidenav.component';
import { FooterTcComponent } from './../layout/footer-tc/footer-tc.component';
import { HeaderTcComponent } from '../layout/header-tc/header-tc.component';
import { HeaderMobileComponent } from './../layout/header-mobile/header-mobile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCartTcComponent } from './../layout/user-cart-tc/user-cart-tc.component';
import { UserCartComponent } from './../layout/user-cart/user-cart.component';
import { UserLoginComponent } from './../layout/user-login/user-login.component';
import { UserLoginTcComponent } from './../layout/user-login-tc/user-login-tc.component';
import { AuthServiceConfig } from 'angularx-social-login';

describe('IndexTcComponent', () => {
  let component: IndexTcComponent;
  let fixture: ComponentFixture<IndexTcComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndexTcComponent, HeaderMobileSidenavComponent, FooterTcComponent,
        HeaderTcComponent, HeaderMobileComponent, UserLoginTcComponent, UserLoginComponent,
        UserCartComponent, UserCartTcComponent],
      imports: [RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      providers: [AuthServiceConfig]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
