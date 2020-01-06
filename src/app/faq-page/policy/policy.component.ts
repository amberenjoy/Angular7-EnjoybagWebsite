/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-07-05 14:52:13
 * @LastEditors: your name
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['../../pages/faq/faq.component.scss']
})
export class PolicyComponent implements OnInit {
  isMobile: boolean;
  constructor(private titleService: Title, private responsiveService: ResponsiveService) { }
  tcStatus: Array<boolean> = [false, false, false, false, false];
  ngOnInit() {
    this.titleService.setTitle('FAQ : Privacy Policy | Enjoy Handbag HK');
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
