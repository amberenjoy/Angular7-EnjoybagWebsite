/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-08-07 12:21:34
 * @LastEditTime: 2019-10-11 16:37:54
 * @LastEditors: Please set LastEditors
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserPagesRoutingModule } from './user-pages-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressesComponent } from './addresses/addresses.component';
import { PasswordComponent } from './password/password.component';
import { OrderListComponent } from './order-list/order-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LayoutComponent, ProfileComponent, AddressesComponent, PasswordComponent, OrderListComponent],
  imports: [
    CommonModule,
    UserPagesRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class UserPagesModule { }
