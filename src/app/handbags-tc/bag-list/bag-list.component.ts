/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-09-30 11:49:51
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { BaglistService } from '../../shared/services/baglist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponsiveService } from './../../shared/services/responsive.service';

@Component({
  selector: 'app-bag-list',
  templateUrl: './bag-list.component.html',
  styleUrls: ['./bag-list.component.scss']
})
export class BagListComponent implements OnInit {
  @Input() parameter: string;  // get parent parameters, key= discount/new/slg
  @Input() parameterSearch: string;  // get search query
  @Output() passResult = new EventEmitter<string>(); // pass result to search page
  result: string;
  parameterKey: string;
  parameterLine: string;
  userCurrency: string;
  userLanguage: string;
  bagCollections: {};
  collections = [];
  collectionList = [];
  key: string;
  loading = true;
  imageCollection = [];
  imageLoader = true;
  windowScrolled: boolean;
  isMobile: boolean;

  constructor(
    private dataService: BaglistService,
    private router: Router,
    private route: ActivatedRoute,
    private responsiveService: ResponsiveService

  ) { }

  @HostListener('window:scroll', [])

  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  ngOnInit() {
    // get currency and language
    this.userCurrency = localStorage.getItem('currency') || 'HKD';

    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.route.params.subscribe(res => {
      this.parameter = res.name;
      this.parameterKey = res.key; // sale==discount
      this.parameterLine = res.line;
      this.loading = true;
      if (this.parameter) {
        if (this.parameter === 'all') {   // women men slg
          const urlTree = this.router.url.split('/');
          let key = urlTree[urlTree.length - 2];
          if (key === 'accessories') {
            key = 'slg';
          }
          this.dataService.getBaglist(key, 'EN', this.userCurrency).subscribe(results => {
            this.bagCollections = results;
            this.initCollection(this.bagCollections);
          }, error => {
            this.loading = false;
            this.collections = [];
            console.log(error);
          });
        } else { // chain wallet crossbody bag
          this.dataService.getBagType(this.parameter, 'EN', this.userCurrency).subscribe(results => {
            this.bagCollections = results;
            this.initCollection(this.bagCollections);
          }, error => {
            this.loading = false;
            this.collections = [];
            console.log(error);
          });
        }
      } else if (this.parameterKey || this.parameterLine) {
        const line = this.parameterKey || this.parameterLine;
        this.dataService.getBaglist(line, 'EN', this.userCurrency).subscribe(results => {
          this.bagCollections = results;
          this.initCollection(this.bagCollections);
        }, error => {
          this.loading = false;
          this.collections = [];
          console.log(error);
        });
      } else if (this.parameterSearch) {
        this.dataService.getQuerylist(this.parameterSearch, 'EN', this.userCurrency).subscribe(results => {
          this.bagCollections = results;
          if (this.bagCollections['count'.toString()] !== '0') {
            this.initCollection(this.bagCollections);
          }
          this.result = this.bagCollections['count'.toString()];
          this.passResult.emit(this.result); // pass result to search page
          if (this.result === '0') {
            this.loading = false;
            this.collections = [];
          }
        }, error => {
          this.loading = false;
          this.collections = [];
          console.log(error);
        });
      }
    });
  }

  initCollection(collections) {
    let i: number;
    // if only has one collection, the json format is object not array, so ngfor will have error
    if (!collections['collection'.toString()].length) {
      this.collections = [];
      this.collections.push(collections['collection'.toString()]);
    } else {
      this.collections = collections['collection'.toString()];
    }
    // if only has one product in collection, the json format is object not array, so ngfor will have error
    for (i = 0; i < this.collections.length; i++) {
      if (this.collections[i]['product'.toString()].length) {
        this.collectionList.push(this.collections[i]);
      } else {
        const copyProduct = this.collections[i]['product'.toString()];
        this.collections[i]['product'.toString()] = [];
        this.collectionList.push(this.collections[i]);
        this.collectionList[i]['product'.toString()].push(copyProduct);
      }
      // for lazy loading more than 8 skus
      this.collectionList[i].more = false;
      // for lazy loading images
      for (let a = 0; a < this.collections[i]['product'.toString()].length; a++) {
        this.collections[i]['product'.toString()][a].image = {
          url: 'https://www.enjoybag.com.hk/photo/' + this.collections[i]['product'.toString()][a].productcode + '_1_c.jpg',
          second: 'https://www.enjoybag.com.hk/photo/' + this.collections[i]['product'.toString()][a].productcode + '_2_c.jpg',
          show: false
        };
      }
    }
    this.loading = false;
  }

  scrollTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
}

