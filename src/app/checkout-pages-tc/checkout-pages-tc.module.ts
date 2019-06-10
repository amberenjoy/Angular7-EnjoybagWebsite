import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
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
  ],
  providers: [
    SharedModule
  ]
})
export class CheckoutPagesTcModule { }
