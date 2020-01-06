/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-10-14 15:00:05
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BagListComponent } from '../bag-list/bag-list.component';
import { ResponsiveService } from './../../shared/services/responsive.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild(BagListComponent, { static: false }) child;
  paramSystem: string;
  count: string;
  isMobile: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paramSystem = params.qry;
    });
    this.title.setTitle('Search Results: ' + this.paramSystem + ' | Enjoy Handbag HK');
    if (!this.paramSystem) {
      this.router.navigate(['/en/home']);
    }
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
  receiveResult($event) {
    this.count = $event;
  }
}
