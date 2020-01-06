/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-07-05 14:52:14
 * @LastEditors: your name
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { DetailComponent } from './detail/detail.component';
import { SearchComponent } from './search/search.component';
import { LineComponent } from './line/line.component';
import { MenComponent } from './men/men.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { IndexComponent } from './index/index.component';
import { WomenComponent } from './women/women.component';

const routes: Routes = [
  {
    path: 'collections',
    component: IndexComponent,
    children: [
      { path: ':line', component: LineComponent },
      { path: ':line/:sku', component: DetailComponent }
    ]
  },
  {
    path: 'women',
    component: IndexComponent,
    children: [
      { path: ':name', component: WomenComponent },
      { path: ':name/:sku', component: DetailComponent }
    ]
  },
  {
    path: 'accessories',
    component: IndexComponent,
    children: [
      { path: ':name', component: AccessoriesComponent },
      { path: ':name/:sku', component: DetailComponent }
    ]
  },
  {
    path: 'men',
    component: IndexComponent,
    children: [
      { path: ':name', component: MenComponent },
      { path: ':name/:sku', component: DetailComponent }
    ]
  },
  {
    path: ':key/all',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: NewComponent
      },
      { path: ':sku', component: DetailComponent }
    ]
  },
  {
    path: 'search',
    component: IndexComponent,
    children: [
      { path: '', component: SearchComponent },
      { path: ':sku', component: DetailComponent }
    ]
  },
  {
    path: ':sku',
    component: IndexComponent, // single item sku page
    children: [{ path: '', component: DetailComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HandbagsRoutingModule {}
