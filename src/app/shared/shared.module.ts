import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './services/auth.guard';
import { CheckoutEnterGuard } from './services/checkout-enter.guard';
import { CheckoutUnPlaceOrderGuard } from './services/checkout-un-place-order.guard';
import { AuthenticationService } from './services/authentication.service';
import { BaglistService } from './services/baglist.service';
import { CartItemService } from './services/cart-item.service';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';
import { CheckoutService } from './services/checkout.service';

@NgModule({
  declarations: [
    AuthenticationService,
    AuthGuard, BaglistService,
    CartItemService, UserService,
    OrderService,
    CheckoutService,
    CheckoutEnterGuard,
    CheckoutUnPlaceOrderGuard
  ],
  imports: [
    CommonModule
  ],
  providers: []
})
export class SharedModule { }
