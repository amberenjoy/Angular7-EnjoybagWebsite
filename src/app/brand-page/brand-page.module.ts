import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandPageRoutingModule } from './brand-page-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventsComponent } from './events/events.component';
import { PhilosophyComponent } from './philosophy/philosophy.component';

@NgModule({
  declarations: [AboutUsComponent, EventsComponent, PhilosophyComponent],
  imports: [
    CommonModule,
    BrandPageRoutingModule
  ]
})

export class BrandPageModule { }
