/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 10:57:11
 * @LastEditTime: 2019-07-22 10:57:11
 * @LastEditors: your name
 */
import { TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories.service';
import { HttpClientModule } from '@angular/common/http';

describe('CategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]

  }));

  it('should be created', () => {
    const service: CategoriesService = TestBed.get(CategoriesService);
    expect(service).toBeTruthy();
  });
});
