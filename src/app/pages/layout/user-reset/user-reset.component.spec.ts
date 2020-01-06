/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-09-03 14:22:50
 * @LastEditTime: 2019-10-02 16:01:38
 * @LastEditors: Please set LastEditors
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResetComponent } from './user-reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { PasswordPageComponent } from './../../password-page/password-page.component';

describe('UserResetComponent', () => {
  let component: UserResetComponent;
  let fixture: ComponentFixture<UserResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserResetComponent, PasswordPageComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{ path: 'en/forgot-password', component: PasswordPageComponent }]),
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
