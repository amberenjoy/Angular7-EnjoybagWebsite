import { Component, OnInit, Input, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { BaglistService } from '../../shared/services/baglist.service';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'
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
  collections: Array<any> = [];
  collectionList: Array<any> = [];
  key: string;
  loading = true;
  imageCollection = [];
  imageLoader = true;
  keyList = ['slg', 'new', 'discount', 'campaign_special', 'gift', 'men', 'women'];
  windowScrolled: boolean;

  constructor(
    private dataService: BaglistService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
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
    // get currency
    this.userCurrency = localStorage.getItem('currency');
    this.userLanguage = localStorage.getItem('language').toUpperCase();
    this.route.params.subscribe(res => {
      console.log(res);
      this.parameter = res.name;
      this.parameterKey = res.key;
      this.parameterLine = res.line;
      this.loading = true;
      if (this.parameter) {
        if (this.parameter === 'all') {   // women men 
          const urlTree = this.router.url.split('/');
          let key = urlTree[urlTree.length - 2];
          console.log(key);
          if (key === 'accessories') {
            key = 'slg';
          }
          this.dataService.getBaglist(key, this.userLanguage, this.userCurrency)
            .subscribe(results => {
              this.bagCollections = results;
              this.initCollection(this.bagCollections);
            });
        } else { // chain wallet crossbody bag
          this.dataService.getBagType(this.parameter, this.userLanguage, this.userCurrency).subscribe(results => {
            this.bagCollections = results;
            this.initCollection(this.bagCollections);
          });
        }
      } else if (this.parameterKey || this.parameterLine) {
        const line = this.parameterKey || this.parameterLine;
        this.dataService.getBaglist(line, this.userLanguage, this.userCurrency)
          .subscribe(results => {

            this.bagCollections = results;
            this.initCollection(this.bagCollections);
          });
      } else if (this.parameterSearch) {
        this.dataService.getQuerylist(this.parameterSearch, this.userLanguage, this.userCurrency).subscribe(results => {

          this.bagCollections = results;
          if (this.bagCollections['count'] !== '0') {
            this.initCollection(this.bagCollections);
          }
          this.result = this.bagCollections['count'];
          this.passResult.emit(this.result); // pass result to search page
        });
      }
    });

  }

  initCollection(collections) {
    let i: number;
    // if only has one collection, the json format is object not array, so ngfor will have error
    if (!collections['collection'].length) {
      this.collections = [];
      this.collections.push(collections['collection']);
    } else {
      this.collections = collections['collection'];
    }
    // if only has one product in collection, the json format is object not array, so ngfor will have error
    for (i = 0; i < this.collections.length; i++) {
      if (this.collections[i]['product'].length) {
        this.collectionList.push(this.collections[i]);
      } else {
        const copyProduct = this.collections[i]['product'];
        this.collections[i]['product'] = [];
        this.collectionList.push(this.collections[i]);
        this.collectionList[i]['product'].push(copyProduct);
      }
      // for lazy loading more than 8 skus
      this.collectionList[i].more = false;
      // for lazy loading images
      for (let a = 0; a < this.collections[i]['product'].length; a++) {
        this.collections[i]['product'][a].image = {
          url: 'https://www.enjoybag.com.hk/photo/' + this.collections[i]['product'][a].productcode + '_1_c.jpg',
          second: 'https://www.enjoybag.com.hk/photo/' + this.collections[i]['product'][a].productcode + '_2_c.jpg',
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