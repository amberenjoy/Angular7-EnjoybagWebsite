import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTcComponent } from './new-tc/new-tc.component';
import { SaleTcComponent } from './sale-tc/sale-tc.component';
import { WomenTcComponent } from './women-tc/women-tc.component';
import { SearchTcComponent } from './search-tc/search-tc.component';
import { AccessoriesTcComponent } from './accessories-tc/accessories-tc.component';
import { DetailTcComponent } from './detail-tc/detail-tc.component';
import { LineTcComponent } from './line-tc/line-tc.component';
import { MenTcComponent } from './men-tc/men-tc.component';

const routes: Routes = [
  {
    path: 'collections',
    children: [
      { path: ':key', component: LineTcComponent },
      { path: ':key/:sku', component: DetailTcComponent },
    ]
  },
  {
    path: 'women',
    children: [
      { path: ':name', component: WomenTcComponent },
      { path: ':name/:sku', component: DetailTcComponent },
    ]
  },
  {
    path: 'accessories',
    children: [
      { path: ':name', component: AccessoriesTcComponent },
      { path: ':name/:sku', component: DetailTcComponent },
    ]
  },
  {
    path: 'men',
    children: [
      { path: ':name', component: MenTcComponent },
      { path: ':name/:sku', component: DetailTcComponent },
    ]
  },
  {
    path: 'sale',
    children: [
      { path: 'all', component: SaleTcComponent },
      { path: 'all/:sku', component: DetailTcComponent },
    ]
  },
  {
    path: 'new',
    children: [
      { path: 'all', component: NewTcComponent },
      { path: 'all/:sku', component: DetailTcComponent },
    ]
  },
  {
    path: 'search',
    children: [
      { path: '', component: SearchTcComponent, runGuardsAndResolvers: 'always', },
      { path: ':sku', component: DetailTcComponent },
    ]
  },
  {
    path: 'items',  // single item sku page
    children: [
      { path: ':sku', component: DetailTcComponent }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HandbagsTcRoutingModule { }
