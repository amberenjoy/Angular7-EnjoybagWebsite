import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';
import { CheckoutEnterGuard } from '../shared/services/checkout-enter.guard';
import { CheckoutUnPlaceOrderGuard } from '../shared/services/checkout-un-place-order.guard';

const routes: Routes = [
  {
    path: 'step-1/mycart',
    component: CartComponent,
  },
  {
    path: 'step-2',
    component: CheckoutComponent,
    canActivate: [CheckoutEnterGuard],
    // canDeactivate: [CheckoutUnPlaceOrderGuard]
  },
  {
    path: 'track-order/:id',
    component: OrderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutPagesTcRoutingModule { }
