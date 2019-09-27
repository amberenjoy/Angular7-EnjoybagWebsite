/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-07-05 14:52:15
 * @LastEditors: your name
 */
import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from './../../../shared/services/responsive.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isMobile: boolean;

  constructor(
    private responsiveService: ResponsiveService,

  ) { }

  ngOnInit() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

}
