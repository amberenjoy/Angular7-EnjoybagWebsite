/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-07-05 14:52:16
 * @LastEditors: your name
 */
import { TestBed } from '@angular/core/testing';

import { CheckoutService } from './checkout.service';
import { HttpClientModule } from '@angular/common/http';

describe('CheckoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]

  }));

  it('should be created', () => {
    const service: CheckoutService = TestBed.get(CheckoutService);
    expect(service).toBeTruthy();
  });
});
