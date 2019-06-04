import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HandbagsRoutingModule } from './handbags-routing.module';
import { SharedModule } from './../shared/shared.module';
import { DeferLoadModule } from '@trademe/ng-defer-load';

import { NewComponent } from './new/new.component';
import { DetailComponent } from './detail/detail.component';
import { SearchComponent } from './search/search.component';
import { LineComponent } from './line/line.component';
import { BagListComponent } from './bag-list/bag-list.component';
import { MenComponent } from './men/men.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { PhotoModalComponent } from './photo-modal/photo-modal.component';
import { IndexComponent } from './index/index.component';
import { WomenComponent } from './women/women.component';

@NgModule({
  declarations: [
    NewComponent, DetailComponent,
    SearchComponent,
    LineComponent, BagListComponent,
    MenComponent,
    AccessoriesComponent,
    PhotoModalComponent,
    IndexComponent,
    WomenComponent
  ],
  imports: [
    CommonModule,
    HandbagsRoutingModule,
    DeferLoadModule
  ],
  providers: [
    SharedModule
  ]
})
export class HandbagsModule { }
