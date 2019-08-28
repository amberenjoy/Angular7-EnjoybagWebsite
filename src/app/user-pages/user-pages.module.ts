import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserPagesRoutingModule } from './user-pages-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressesComponent } from './addresses/addresses.component';
import { PasswordComponent } from './password/password.component';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  declarations: [LayoutComponent, ProfileComponent, AddressesComponent, PasswordComponent, OrderListComponent],
  imports: [
    CommonModule,
    UserPagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserPagesModule { }
