import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandbagsTcRoutingModule } from './handbags-tc-routing.module';
import { SharedModule } from './../shared/shared.module';
import { DeferLoadModule } from '@trademe/ng-defer-load';

import { BagListComponent } from './bag-list/bag-list.component';
import { NewTcComponent } from './new-tc/new-tc.component';
import { SaleTcComponent } from './sale-tc/sale-tc.component';
import { WomenTcComponent } from './women-tc/women-tc.component';
import { SearchTcComponent } from './search-tc/search-tc.component';
import { AccessoriesTcComponent } from './accessories-tc/accessories-tc.component';
import { DetailTcComponent } from './detail-tc/detail-tc.component';
import { LineTcComponent } from './line-tc/line-tc.component';
import { MenTcComponent } from './men-tc/men-tc.component';
import { PhotoModalComponent } from './photo-modal/photo-modal.component';

@NgModule({
  declarations: [NewTcComponent, SaleTcComponent, WomenTcComponent, SearchTcComponent,
    AccessoriesTcComponent, DetailTcComponent, LineTcComponent, MenTcComponent, BagListComponent, PhotoModalComponent],
  imports: [
    CommonModule,
    HandbagsTcRoutingModule,
    DeferLoadModule
  ],
  providers: [
    SharedModule]
})
export class HandbagsTcModule { }
