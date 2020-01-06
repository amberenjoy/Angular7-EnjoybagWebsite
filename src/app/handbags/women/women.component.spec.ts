/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-10-17 15:39:04
 * @LastEditors: Please set LastEditors
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenComponent } from './women.component';
import { BagListComponent } from './../bag-list/bag-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ActivatedRouteStub,
  ActivatedRoute
} from '../../../testing/activated-route-stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WomenComponent', () => {
  let component: WomenComponent;
  let fixture: ComponentFixture<WomenComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [WomenComponent, BagListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WomenComponent);
    component = fixture.componentInstance;
    activatedRoute.setParamMap({ name: 'all' });

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component.name).toBe('all');
    expect(component).toBeTruthy();
  });
});
