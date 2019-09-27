/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-09-25 16:21:11
 * @LastEditors: Please set LastEditors
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandbagsTcRoutingModule } from './handbags-tc-routing.module';
import { DeferLoadModule } from '@trademe/ng-defer-load';

import { BagListComponent } from './bag-list/bag-list.component';
import { NewTcComponent } from './new-tc/new-tc.component';
import { WomenTcComponent } from './women-tc/women-tc.component';
import { SearchTcComponent } from './search-tc/search-tc.component';
import { AccessoriesTcComponent } from './accessories-tc/accessories-tc.component';
import { DetailTcComponent } from './detail-tc/detail-tc.component';
import { LineTcComponent } from './line-tc/line-tc.component';
import { MenTcComponent } from './men-tc/men-tc.component';
import { PhotoModalComponent } from './photo-modal/photo-modal.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [NewTcComponent, WomenTcComponent, SearchTcComponent,
    AccessoriesTcComponent, DetailTcComponent, LineTcComponent, MenTcComponent, BagListComponent, PhotoModalComponent, IndexComponent],
  imports: [
    CommonModule,
    HandbagsTcRoutingModule,
    DeferLoadModule
  ]
})
export class HandbagsTcModule { }
