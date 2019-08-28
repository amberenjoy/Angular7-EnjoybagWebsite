import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { CheckoutPagesRoutingModule } from './checkout-pages-routing.module';

import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [CartComponent, OrderComponent, CheckoutComponent, IndexComponent],
  imports: [
    CommonModule,
    CheckoutPagesRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    SharedModule
  ]
})
export class CheckoutPagesModule { }
