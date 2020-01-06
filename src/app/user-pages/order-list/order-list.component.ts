/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 12:23:50
 * @LastEditTime: 2019-08-07 12:23:50
 * @LastEditors: your name
 */
import { ResponsiveService } from './../../shared/services/responsive.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderArray = [];
  isMobile: boolean;
  constructor(
    private title: Title,
    private orderService: OrderService,
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    this.title.setTitle('My Account - Order History | Enjoybag HK');

    this.orderService.getUserOrders().subscribe(res => {
      this.orderArray = res;
    });

    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

}
