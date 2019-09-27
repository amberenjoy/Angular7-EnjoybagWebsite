/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-09-27 12:13:56
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from './../../shared/services/responsive.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  isMobile: boolean;
  sideMenuStatus: boolean;

  constructor(
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    // this.onResize();
    this.responsiveService.checkWidth();
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.responsiveService.getMobileSideStatus().subscribe(res => {
      this.sideMenuStatus = res;
    });
  }
}
