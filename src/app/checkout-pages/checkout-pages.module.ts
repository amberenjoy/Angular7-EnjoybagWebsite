/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-10-11 16:17:15
 * @LastEditors: Please set LastEditors
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CheckoutPagesRoutingModule } from './checkout-pages-routing.module';

import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [CartComponent, OrderComponent, CheckoutComponent, IndexComponent, FooterComponent],
  imports: [
    CommonModule,
    CheckoutPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class CheckoutPagesModule { }
