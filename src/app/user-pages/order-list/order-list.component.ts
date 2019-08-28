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
  constructor(
    private title: Title,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.title.setTitle('My Account - Order History | Enjoybag HK');

    this.orderService.getUserOrders().subscribe(res => {
      this.orderArray = res;
    });
  }

}
