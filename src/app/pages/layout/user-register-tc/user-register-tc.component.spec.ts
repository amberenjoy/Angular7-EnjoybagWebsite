/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-07-05 14:52:15
* @LastEditTime: 2019-09-30 12:41:34
* @LastEditors: Please set LastEditors
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterTcComponent } from './user-register-tc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('UserRegisterTcComponent', () => {
  let component: UserRegisterTcComponent;
  let fixture: ComponentFixture<UserRegisterTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegisterTcComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
