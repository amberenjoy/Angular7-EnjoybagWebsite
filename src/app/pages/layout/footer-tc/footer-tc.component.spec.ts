/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-10-02 15:53:36
 * @LastEditors: Please set LastEditors
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterTcComponent } from './footer-tc.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FooterTcComponent', () => {
  let component: FooterTcComponent;
  let fixture: ComponentFixture<FooterTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterTcComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
