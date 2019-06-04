import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTcComponent } from './header-tc.component';
import { SearchTcComponent } from './../search-tc/search-tc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCartTcComponent } from './../user-cart-tc/user-cart-tc.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('HeaderTcComponent', () => {
  let component: HeaderTcComponent;
  let fixture: ComponentFixture<HeaderTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderTcComponent, SearchTcComponent, UserCartTcComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
