/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-07-05 14:52:16
* @LastEditTime: 2019-09-30 12:37:47
* @LastEditors: Please set LastEditors
*/
import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [RouterTestingModule, RouterModule, HttpClientModule]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
