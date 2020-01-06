/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-07-05 14:52:13
 * @LastEditors: your name
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenTcComponent } from './men-tc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BagListComponent } from './../bag-list/bag-list.component';

describe('MenTcComponent', () => {
  let component: MenTcComponent;
  let fixture: ComponentFixture<MenTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenTcComponent, BagListComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
