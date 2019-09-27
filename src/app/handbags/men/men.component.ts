/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-09-24 11:25:22
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ResponsiveService } from './../../shared/services/responsive.service';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['../new/new.component.scss']
})
export class MenComponent implements OnInit {

  name: string;
  isMobile: boolean;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['name'.toString()];
    });
    this.title.setTitle('Designer ' + this.name + ' for Men | Enjoybag HK');
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

}
