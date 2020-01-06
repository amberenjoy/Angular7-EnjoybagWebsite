/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-10-14 15:34:21
 * @LastEditors: Please set LastEditors
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesTcComponent } from './accessories-tc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BagListComponent } from '../bag-list/bag-list.component';

describe('AccessoriesTcComponent', () => {
  let component: AccessoriesTcComponent;
  let fixture: ComponentFixture<AccessoriesTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccessoriesTcComponent, BagListComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
