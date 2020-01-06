/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-10-15 10:48:54
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['../../pages/faq/faq.component.scss']
})
export class PaymentComponent implements OnInit {
  isMobile: boolean;
  constructor(private title: Title, private responsiveService: ResponsiveService) { }

  ngOnInit() {
    this.title.setTitle('FAQ : Payment Details  | Enjoy Handbag HK');
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}

