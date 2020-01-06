/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-07-05 14:52:13
 * @LastEditors: your name
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqPageRoutingModule } from './faq-page-routing.module';

import { DeliveryComponent } from './delivery/delivery.component';
import { MembershipComponent } from './membership/membership.component';
import { TcComponent } from './tc/tc.component';
import { PolicyComponent } from './policy/policy.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { CareComponent } from './care/care.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    DeliveryComponent, MembershipComponent, TcComponent,
    PolicyComponent, MaintenanceComponent,
    CareComponent, PaymentComponent
  ],
  imports: [
    CommonModule,
    FaqPageRoutingModule,
  ]
})
export class FaqPageModule { }
