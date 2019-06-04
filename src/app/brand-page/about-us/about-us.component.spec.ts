import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsComponent } from './about-us.component';
import { HeaderComponent } from './../../common-module/header/header.component';
import { FooterComponent } from './../../common-module/footer/footer.component';
import { SearchComponent } from './../../common-module/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCartComponent } from './../../common-module/user-cart/user-cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsComponent, HeaderComponent, FooterComponent, SearchComponent, UserCartComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
