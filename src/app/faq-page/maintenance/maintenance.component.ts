/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-10-15 10:50:45
 * @LastEditors: Please set LastEditors
 */
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['../../pages/faq/faq.component.scss']
})
export class MaintenanceComponent implements OnInit {
  isMobile: boolean;
  constructor(
    private titleService: Title,
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('FAQ : Maintenance | Enjoy Handbag HK');
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

}
