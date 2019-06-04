import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTcComponent } from './sale-tc.component';
import { HeaderTcComponent } from './../../common-module/header-tc/header-tc.component';
import { FooterTcComponent } from './../../common-module/footer-tc/footer-tc.component';
import { SearchTcComponent } from './../../common-module/search-tc/search-tc.component';
import { UserCartTcComponent } from './../../common-module/user-cart-tc/user-cart-tc.component';
import { ContactTcComponent } from './../../common-module/contact-tc/contact-tc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BagListComponent } from './../bag-list/bag-list.component';

describe('SaleTcComponent', () => {
  let component: SaleTcComponent;
  let fixture: ComponentFixture<SaleTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaleTcComponent, HeaderTcComponent, FooterTcComponent, SearchTcComponent,
        UserCartTcComponent, ContactTcComponent, BagListComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
