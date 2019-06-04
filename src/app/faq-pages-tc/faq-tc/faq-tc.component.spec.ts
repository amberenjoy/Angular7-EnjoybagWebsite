import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqTcComponent } from './faq-tc.component';
import { HeaderTcComponent } from './../../common-module/header-tc/header-tc.component';
import { FooterTcComponent } from './../../common-module/footer-tc/footer-tc.component';
import { SearchTcComponent } from './../../common-module/search-tc/search-tc.component';
import { UserCartTcComponent } from './../../common-module/user-cart-tc/user-cart-tc.component';
import { ContactTcComponent } from './../../common-module/contact-tc/contact-tc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('FaqTcComponent', () => {
  let component: FaqTcComponent;
  let fixture: ComponentFixture<FaqTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqTcComponent, HeaderTcComponent, FooterTcComponent, SearchTcComponent, UserCartTcComponent, ContactTcComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
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
