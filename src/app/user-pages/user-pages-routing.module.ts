import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AddressesComponent } from './addresses/addresses.component';
import { PasswordComponent } from './password/password.component';
import { OrderListComponent } from './order-list/order-list.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
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
