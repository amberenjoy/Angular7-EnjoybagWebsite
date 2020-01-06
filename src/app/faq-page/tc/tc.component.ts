/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-10-15 10:49:02
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';

@Component({
  selector: 'app-tc',
  templateUrl: './tc.component.html',
  styleUrls: ['../../pages/faq/faq.component.scss']
})
export class TcComponent implements OnInit {
  isMobile: boolean;
  constructor(private titleService: Title, private responsiveService: ResponsiveService) { }

  ngOnInit() {
    this.titleService.setTitle('FAQ : Terms and Conditions | Enjoy Handbag HK');
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
