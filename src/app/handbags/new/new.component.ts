/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-10-25 12:46:59
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResponsiveService } from './../../shared/services/responsive.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  key: string;
  isMobile: boolean;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.key = params.get('key');
      if (this.key === 'discount') {
        this.title.setTitle(
          'Designer Sale : Handbags and Accessories  | Enjoybag HK'
        );
      } else {
        this.title.setTitle(
          'Designer New : Handbags and Accessories| Enjoybag HK'
        );
      }
    });
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
