import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqPagesTcRoutingModule } from './faq-pages-tc-routing.module';
import { DeliveryComponent } from './delivery/delivery.component';
import { MembershipComponent } from './membership/membership.component';
import { TcComponent } from './tc/tc.component';
import { PolicyComponent } from './policy/policy.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { CareComponent } from './care/care.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    DeliveryComponent, MembershipComponent,
    TcComponent,
    PolicyComponent,
    MaintenanceComponent,
    CareComponent, PaymentComponent],
  imports: [
    CommonModule,
    FaqPagesTcRoutingModule
  ]
})
export class FaqPagesTcModule { }
