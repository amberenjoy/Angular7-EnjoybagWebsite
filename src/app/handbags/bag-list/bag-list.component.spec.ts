/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-10-17 14:59:03
 * @LastEditors: Please set LastEditors
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagListComponent } from './bag-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaglistService } from './../../shared/services/baglist.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('BagListComponent', () => {
  let component: BagListComponent;
  let fixture: ComponentFixture<BagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BagListComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FontAwesomeModule
      ],
      providers: [BaglistService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
