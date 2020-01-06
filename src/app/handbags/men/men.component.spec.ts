/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-07-05 14:52:14
 * @LastEditors: your name
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenComponent } from './men.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BagListComponent } from './../bag-list/bag-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MenComponent', () => {
  let component: MenComponent;
  let fixture: ComponentFixture<MenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenComponent, BagListComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
