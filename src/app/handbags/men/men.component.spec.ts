import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenComponent } from './men.component';
import { HeaderComponent } from './../../common-module/header/header.component';
import { FooterComponent } from './../../common-module/footer/footer.component';
import { SearchComponent } from './../../common-module/search/search.component';
import { UserCartComponent } from './../../common-module/user-cart/user-cart.component';
import { ContactComponent } from './../../common-module/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BagListComponent } from './../bag-list/bag-list.component';

describe('MenComponent', () => {
  let component: MenComponent;
  let fixture: ComponentFixture<MenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenComponent, HeaderComponent, FooterComponent, SearchComponent,
        UserCartComponent, ContactComponent, BagListComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
