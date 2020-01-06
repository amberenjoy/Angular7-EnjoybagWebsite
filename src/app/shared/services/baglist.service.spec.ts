/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-10-17 16:05:06
 * @LastEditors: Please set LastEditors
 */
import { TestBed } from '@angular/core/testing';

import { BaglistService } from './baglist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BaglistService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it('should be created', () => {
    const service: BaglistService = TestBed.get(BaglistService);
    expect(service).toBeTruthy();
  });
});
