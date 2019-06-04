import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTcComponent } from './search-tc.component';
import { HeaderTcComponent } from './../../common-module/header-tc/header-tc.component';
import { FooterTcComponent } from './../../common-module/footer-tc/footer-tc.component';
import { UserCartTcComponent } from './../../common-module/user-cart-tc/user-cart-tc.component';
import { ContactTcComponent } from './../../common-module/contact-tc/contact-tc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BagListComponent } from './../bag-list/bag-list.component';

describe('SearchTcComponent', () => {
  let component: SearchTcComponent;
  let fixture: ComponentFixture<SearchTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTcComponent, HeaderTcComponent, FooterTcComponent,
        UserCartTcComponent, ContactTcComponent, BagListComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
