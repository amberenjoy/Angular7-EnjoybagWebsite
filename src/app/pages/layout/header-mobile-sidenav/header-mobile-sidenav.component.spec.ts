/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-23 15:18:06
 * @LastEditTime: 2019-10-14 12:24:07
 * @LastEditors: Please set LastEditors
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMobileSidenavComponent } from './header-mobile-sidenav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('HeaderMobileSidenavComponent', () => {
  let component: HeaderMobileSidenavComponent;
  let fixture: ComponentFixture<HeaderMobileSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMobileSidenavComponent],
      imports: [RouterTestingModule, HttpClientModule, FontAwesomeModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMobileSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
