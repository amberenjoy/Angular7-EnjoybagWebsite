import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTcComponent } from './new-tc/new-tc.component';
import { WomenTcComponent } from './women-tc/women-tc.component';
import { SearchTcComponent } from './search-tc/search-tc.component';
import { AccessoriesTcComponent } from './accessories-tc/accessories-tc.component';
import { DetailTcComponent } from './detail-tc/detail-tc.component';
import { LineTcComponent } from './line-tc/line-tc.component';
import { MenTcComponent } from './men-tc/men-tc.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: 'collections',
    component: IndexComponent,
    children: [
      { path: ':line', component: LineTcComponent },
      { path: ':line/:sku', component: DetailTcComponent },
    ]
  },
  {
    path: 'women',
    component: IndexComponent,
    children: [
      { path: ':name', component: WomenTcComponent },
      { path: ':name/:sku', component: DetailTcComponent },
    ]
  },
  {
    path: 'accessories',
    component: IndexComponent,
    children: [
      { path: ':name', component: AccessoriesTcComponent },
      { path: ':name/:sku', component: DetailTcComponent },
    ]
  },
  {
    path: 'men',
    component: IndexComponent,
    children: [
      { path: ':name', component: MenTcComponent },
      { path: ':name/:sku', component: DetailTcComponent },
    ]
  },
  {
    path: ':key/all',
    component: IndexComponent,
    children: [
      {
        path: '', component: NewTcComponent,
      },
      { path: ':sku', component: DetailTcComponent },
    ]
  },
  {
    path: 'search',
    component: IndexComponent,
    children: [
      { path: '', component: SearchTcComponent },
      { path: ':sku', component: DetailTcComponent },
    ]
  },
  {
    path: ':sku',
    component: IndexComponent,  // single item sku page
    children: [
      { path: '', component: DetailTcComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HandbagsTcRoutingModule { }
