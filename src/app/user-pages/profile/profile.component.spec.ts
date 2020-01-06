/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-08-07 12:23:06
* @LastEditTime: 2019-10-14 12:28:11
* @LastEditors: Please set LastEditors
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { UserLoginComponent } from './../../pages/layout/user-login/user-login.component';
import { UserRegisterComponent } from './../../pages/layout/user-register/user-register.component';
import { UserRegisterPageComponent } from './../../pages/user-register-page/user-register-page.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent, UserRegisterPageComponent, UserLoginComponent, UserRegisterComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{ path: 'en/register', component: UserRegisterPageComponent }]),
        HttpClientModule, FontAwesomeModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
