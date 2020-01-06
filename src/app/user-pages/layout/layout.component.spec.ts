/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 12:22:51
 * @LastEditTime: 2019-10-17 15:15:53
 * @LastEditors: Please set LastEditors
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserRegisterPageComponent } from 'src/app/pages/user-register-page/user-register-page.component';
import { UserLoginComponent } from 'src/app/pages/layout/user-login/user-login.component';
import { UserRegisterComponent } from 'src/app/pages/layout/user-register/user-register.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        UserLoginComponent,
        UserRegisterComponent,
        UserRegisterPageComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'en/register', component: UserRegisterPageComponent }
        ]),
        HttpClientTestingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
