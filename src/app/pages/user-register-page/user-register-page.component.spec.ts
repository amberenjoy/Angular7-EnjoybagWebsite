/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-10-18 14:31:34
 * @LastEditors: Please set LastEditors
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { UserRegisterPageComponent } from './user-register-page.component';
import { UserLoginComponent } from '../layout/user-login/user-login.component';
import { UserRegisterComponent } from '../layout/user-register/user-register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  AuthServiceConfig,
  FacebookLoginProvider
} from 'angularx-social-login';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserRegisterPageComponent', () => {
  let component: UserRegisterPageComponent;
  let fixture: ComponentFixture<UserRegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserRegisterPageComponent,
        UserLoginComponent,
        UserRegisterComponent
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
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
