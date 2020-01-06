/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-07-05 14:52:16
 * @LastEditors: your name
 */
import { TestBed } from '@angular/core/testing';

import { CartItemService } from './cart-item.service';
import { HttpClientModule } from '@angular/common/http';

describe('CartItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: CartItemService = TestBed.get(CartItemService);
    expect(service).toBeTruthy();
  });
});
