/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-10-25 14:41:11
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ResponsiveService } from './../../shared/services/responsive.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['../new/new.component.scss']
})
export class LineComponent implements OnInit {
  line: string;
  isMobile: boolean;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.line = params.get('line');
    });
    this.title.setTitle(
      'Designer special collections: ' + this.line + ' | Enjoy Handbag HK'
    );
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
