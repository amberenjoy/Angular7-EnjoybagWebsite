/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-09-03 10:20:31
* @LastEditTime: 2019-09-30 16:34:40
* @LastEditors: Please set LastEditors
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordPageComponent } from './password-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PasswordPageComponent', () => {
  let component: PasswordPageComponent;
  let fixture: ComponentFixture<PasswordPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordPageComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
