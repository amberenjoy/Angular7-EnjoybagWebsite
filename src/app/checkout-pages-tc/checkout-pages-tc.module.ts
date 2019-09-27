/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:12
 * @LastEditTime: 2019-09-25 16:21:52
 * @LastEditors: Please set LastEditors
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { CheckoutPagesTcRoutingModule } from './checkout-pages-tc-routing.module';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [CartComponent, CheckoutComponent, OrderComponent],
  imports: [
    CommonModule,
    CheckoutPagesTcRoutingModule,
    ReactiveFormsModule
  ]
})
export class CheckoutPagesTcModule { }
