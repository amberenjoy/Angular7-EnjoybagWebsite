import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandPagesRoutingModule } from './brand-pages-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventsComponent } from './events/events.component';
import { PhilosophyComponent } from './philosophy/philosophy.component';

@NgModule({
  declarations: [AboutUsComponent, EventsComponent, PhilosophyComponent],
  imports: [
    CommonModule,
    BrandPagesRoutingModule
  ]
})
export class BrandPagesModule { }
