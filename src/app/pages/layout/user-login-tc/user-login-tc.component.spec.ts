import { HttpClientModule } from '@angular/common/http';
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-09-30 16:28:21
 * @LastEditors: Please set LastEditors
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginTcComponent } from './user-login-tc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserLoginTcComponent', () => {
  let component: UserLoginTcComponent;
  let fixture: ComponentFixture<UserLoginTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoginTcComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
