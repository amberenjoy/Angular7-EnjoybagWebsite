/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-09-30 14:53:45
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BagListComponent } from '../bag-list/bag-list.component';

@Component({
  selector: 'app-search-tc',
  templateUrl: './search-tc.component.html',
  styleUrls: ['./search-tc.component.scss']
})
export class SearchTcComponent implements OnInit {
  @ViewChild(BagListComponent, { static: false }) child;
  paramSystem: string;
  count: string;
  constructor(private route: ActivatedRoute, private router: Router, private title: Title) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paramSystem = params.qry;
      this.title.setTitle('Search Results: ' + this.paramSystem + ' | Enjoybag HK');
    });
    if (!this.paramSystem) {
      this.router.navigate(['/tc/home']);
    }
  }
  receiveResult($event) {
    this.count = $event;
  }
}

