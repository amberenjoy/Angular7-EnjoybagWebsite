import { RouterTestingModule } from '@angular/router/testing';
/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-08-07 12:23:25
 * @LastEditTime: 2019-09-30 12:29:03
 * @LastEditors: Please set LastEditors
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesComponent } from './addresses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('AddressesComponent', () => {
  let component: AddressesComponent;
  let fixture: ComponentFixture<AddressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressesComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
