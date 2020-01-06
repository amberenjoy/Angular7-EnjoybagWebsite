/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 12:21:34
 * @LastEditTime: 2019-08-07 12:21:34
 * @LastEditors: your name
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AddressesComponent } from './addresses/addresses.component';
import { PasswordComponent } from './password/password.component';
import { OrderListComponent } from './order-list/order-list.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../shared/services/auth.guard';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], component: LayoutComponent,
    children: [
      { path: ':id/profile', component: ProfileComponent },
      { path: ':id/order-history', component: OrderListComponent },
      { path: ':id/address-book', component: AddressesComponent },
      { path: ':id/password', component: PasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPagesRoutingModule { }
