import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesComponent } from './accessories.component';
import { HeaderComponent } from './../../common-module/header/header.component';
import { FooterComponent } from './../../common-module/footer/footer.component';
import { SearchComponent } from './../../common-module/search/search.component';
import { UserCartComponent } from './../../common-module/user-cart/user-cart.component';
import { ContactComponent } from './../../common-module/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BagListComponent } from './../bag-list/bag-list.component';

describe('AccessoriesComponent', () => {
  let component: AccessoriesComponent;
  let fixture: ComponentFixture<AccessoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccessoriesComponent, HeaderComponent, FooterComponent, SearchComponent,
        UserCartComponent, ContactComponent, BagListComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
