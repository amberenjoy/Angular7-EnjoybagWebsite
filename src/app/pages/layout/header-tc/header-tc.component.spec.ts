/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-10-02 17:26:58
 * @LastEditors: Please set LastEditors
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTcComponent } from './header-tc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCartTcComponent } from './../user-cart-tc/user-cart-tc.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { AuthServiceConfig } from 'angularx-social-login';

describe('HeaderTcComponent', () => {
  let component: HeaderTcComponent;
  let fixture: ComponentFixture<HeaderTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderTcComponent, UserCartTcComponent, UserLoginComponent, UserCartComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      providers: [AuthServiceConfig]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
