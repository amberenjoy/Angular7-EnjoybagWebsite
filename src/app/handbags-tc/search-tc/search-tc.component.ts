import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
    });
    this.title.setTitle('Search Results: ' + this.paramSystem + ' | Enjoybag HK');
    if (!this.paramSystem) {
      this.router.navigateByUrl('/tc/home');
    }
  }
  receiveResult($event) {
    this.count = $event;
  }
}

