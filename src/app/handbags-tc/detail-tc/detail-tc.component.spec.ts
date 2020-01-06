/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-07-05 14:52:13
 * @LastEditors: your name
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTcComponent } from './detail-tc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { PhotoModalComponent } from './../photo-modal/photo-modal.component';

describe('DetailTcComponent', () => {
  let component: DetailTcComponent;
  let fixture: ComponentFixture<DetailTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTcComponent, PhotoModalComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
