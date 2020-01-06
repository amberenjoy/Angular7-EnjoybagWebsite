/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-10-10 15:36:45
 * @LastEditors: Please set LastEditors
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutEnterGuard } from '../shared/services/checkout-enter.guard';
import { CheckoutUnPlaceOrderGuard } from '../shared/services/checkout-un-place-order.guard';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'shopping-bag',
        component: CartComponent
      },
      {
        path: 'shipping-payment',
        component: CheckoutComponent,
        canActivate: [CheckoutEnterGuard],
        canDeactivate: [CheckoutUnPlaceOrderGuard]
      },
      {
        path: 'track-order/:id',
        component: OrderComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutPagesRoutingModule { }
