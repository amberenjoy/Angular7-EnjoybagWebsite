/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-09-25 16:21:19
 * @LastEditors: Please set LastEditors
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ]
})
export class CheckoutPagesModule { }
