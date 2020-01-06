import { HttpClientModule } from '@angular/common/http';
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-09-30 12:34:32
 * @LastEditors: Please set LastEditors
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCartTcComponent } from './user-cart-tc.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserCartTcComponent', () => {
  let component: UserCartTcComponent;
  let fixture: ComponentFixture<UserCartTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserCartTcComponent],
      imports: [RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCartTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
