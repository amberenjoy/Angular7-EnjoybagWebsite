import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-10-17 16:06:44
 * @LastEditors: Please set LastEditors
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { HeaderMobileSidenavComponent } from './../layout/header-mobile-sidenav/header-mobile-sidenav.component';
import { FooterComponent } from './../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';
import { HeaderMobileComponent } from './../layout/header-mobile/header-mobile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserCartComponent } from './../layout/user-cart/user-cart.component';
import { UserLoginComponent } from './../layout/user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthServiceConfig,
  FacebookLoginProvider
} from 'angularx-social-login';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IndexComponent,
        HeaderComponent,
        HeaderMobileSidenavComponent,
        HeaderMobileComponent,
        FooterComponent,
        UserLoginComponent,
        UserCartComponent
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        FontAwesomeModule
      ],
      providers: [
        {
          provide: AuthServiceConfig,
          useFactory: [
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider('1032790253567506')
            }
          ]
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
