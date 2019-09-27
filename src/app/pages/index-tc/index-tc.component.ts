/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-07-05 14:52:15
 * @LastEditors: your name
 */
import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from './../../shared/services/responsive.service';

@Component({
  selector: 'app-index-tc',
  templateUrl: './index-tc.component.html',
  styleUrls: ['./index-tc.component.scss']
})
export class IndexTcComponent implements OnInit {
  isMobile: boolean;
  sideMenuStatus: boolean;

  constructor(
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    this.onResize();
    this.responsiveService.checkWidth();
    this.responsiveService.getMobileSideStatus().subscribe(res => {
      this.sideMenuStatus = res;
    });
  }

  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
      console.log('check mobile device', isMobile);
    });
  }

}
