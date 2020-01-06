/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-07-05 14:52:16
 * @LastEditors: your name
 */
import { TestBed, async, inject } from '@angular/core/testing';

import { CheckoutEnterGuard } from './checkout-enter.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('CheckoutEnterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutEnterGuard],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([CheckoutEnterGuard], (guard: CheckoutEnterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
