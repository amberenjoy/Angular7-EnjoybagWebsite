/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-10-14 12:22:13
 * @LastEditors: Please set LastEditors
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { FooterComponent } from './../footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './../cart/cart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent, FooterComponent, CartComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'shopping-bag', component: CartComponent }]),
        FormsModule, ReactiveFormsModule, HttpClientModule, FontAwesomeModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
