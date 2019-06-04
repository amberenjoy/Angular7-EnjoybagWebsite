import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { HeaderComponent } from './../../common-module/header/header.component';
import { FooterComponent } from './../../common-module/footer/footer.component';
import { SearchComponent } from './../../common-module/search/search.component';
import { UserCartComponent } from './../../common-module/user-cart/user-cart.component';
import { ContactComponent } from './../../common-module/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { PhotoModalComponent } from './../photo-modal/photo-modal.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent, HeaderComponent, FooterComponent, SearchComponent,
        UserCartComponent, ContactComponent, PhotoModalComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
