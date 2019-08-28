/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 15:28:46
 * @LastEditTime: 2019-08-12 15:35:56
 * @LastEditors: Please set LastEditors
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventsComponent } from './events/events.component';
import { PhilosophyComponent } from './philosophy/philosophy.component';

const routes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'our-philosophy', component: PhilosophyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandPagesRoutingModule { }
