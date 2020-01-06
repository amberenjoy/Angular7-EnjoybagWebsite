/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-09-30 14:19:36
 * @LastEditors: Please set LastEditors
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqTcComponent } from './faq-tc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactTcComponent } from './../layout/contact-tc/contact-tc.component';

describe('FaqTcComponent', () => {
  let component: FaqTcComponent;
  let fixture: ComponentFixture<FaqTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqTcComponent, ContactTcComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
