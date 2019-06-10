import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery/delivery.component';
import { MembershipComponent } from './membership/membership.component';
import { TcComponent } from './tc/tc.component';
import { PolicyComponent } from './policy/policy.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { CareComponent } from './care/care.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'delivery', component: DeliveryComponent },
      { path: 'membership', component: MembershipComponent },
      { path: 'tc', component: TcComponent },
      { path: 'privacy-policy', component: PolicyComponent },
      { path: 'maintenance', component: MaintenanceComponent },
      { path: 'product-care', component: CareComponent },
      { path: 'payment', component: PaymentComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqPagesTcRoutingModule { }
