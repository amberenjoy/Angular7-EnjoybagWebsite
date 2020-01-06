/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-09-30 12:33:37
 * @LastEditors: Please set LastEditors
 */
import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('ModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, MatDialogModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: ModalService = TestBed.get(ModalService);
    expect(service).toBeTruthy();
  });
});
