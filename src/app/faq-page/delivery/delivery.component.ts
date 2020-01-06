/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-10-15 10:42:23
 * @LastEditors: Please set LastEditors
*/
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['../../pages/faq/faq.component.scss']
})
export class DeliveryComponent implements OnInit {

  deliveryStatus: Array<boolean> = [false, false, false, false, false];
  isMobile: boolean;

  constructor(
    private titleService: Title,
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('FAQ : Delivery and Returns | Enjoy Handbag HK');
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

}
