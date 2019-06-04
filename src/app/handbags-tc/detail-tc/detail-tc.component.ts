import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaglistService } from '../../shared/services/baglist.service';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { CartItemService } from './../../shared/services/cart-item.service';
import { Product } from './../../shared/models/product';

@Component({
  selector: 'app-detail-tc',
  templateUrl: './detail-tc.component.html',
  styleUrls: ['./detail-tc.component.scss']
})

export class DetailTcComponent implements OnInit {
  sku: number;
  bag: {};
  bagPhotoArray: any[] = [];
  bagDetail: Array<any> = [];
  bagMaterial: Array<any> = [];
  otherColorList: Array<any> = [];
  loading = true;
  key: string;
  userCurrency: string;
  userLanguage: string;

  addBag = false;
  subtotal = 0;
  href: any;
  keyLink: any;

  showLargePhoto = false;
  largePhotoIndex: string;
  shareInfo: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: BaglistService,
    private title: Title,
    private meta: Meta,
    private element: ElementRef,
    private cartItem: CartItemService
  ) { }

  ngOnInit() {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.route.params.subscribe(params => {
      this.sku = +params['sku']; // (+) converts string 'id' to a number
      this.key = params.key;
    });
    // get currency
    this.userCurrency = localStorage.getItem('currency') || '';
    if (!this.userCurrency) {
      this.userCurrency = 'HKD';
      localStorage.setItem('currency', 'HKD');
    }
    // get subline after home link
    if (!this.key) {
      this.key = this.router.url.split('/')[2];
      this.href = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
      this.keyLink = this.href.substring(0, this.href.lastIndexOf('/'));
    }
    this.dataService.getBag(this.sku, 'EN', this.userCurrency).subscribe(results => {
      this.loading = false;
      this.bag = results;
      this.getAllInfo(this.bag);
    });
  }

  getAllInfo(bag) {
    this.title.setTitle('Enjoybag ' + bag['productname'] + ' : ' + bag['type']);
    this.meta.addTag({ name: 'description', content: bag['Description'] });
    this.meta.addTag({ name: 'keywords', content: bag['productname'] });

    this.shareInfo = {
      title: bag.productname,
      desc: bag.Description,
      url: 'https://www.enjoybag.com.hk/product-info.html?lan=EN&sku=' + this.sku,
      imgurl: 'https://www.enjoybag.com.hk/photo/' + this.sku + '_1_c.jpg',
    };

    for (let i = 1; i <= bag.photono; i++) {
      this.bagPhotoArray.push({
        url: 'https://www.enjoybag.com.hk/photo/' + this.sku + '_' + i + '_c.jpg',
        show: false
      });
    }
    // if only single value, it is object not array ngFor get error
    if (bag.MainMaterial.length && typeof bag.MainMaterial !== 'string') {
      this.bagMaterial = bag.MainMaterial;
    } else {
      this.bagMaterial[0] = bag.MainMaterial;
    }
    // if only single value, it is object not array ngFor get error
    if (bag.Detail.length) {
      this.bagDetail = bag.Detail;
    } else {
      this.bagDetail.push(bag.Detail);
    }
    // get other color
    if (bag.othercolor_productcode['totalcolor'] === '0' || !bag.othercolor_productcode['totalcolor']) {
      this.otherColorList = [];
    } else if (bag.othercolor_productcode.product.length) {
      this.otherColorList = bag.othercolor_productcode.product;
    } else {
      this.otherColorList.push(bag.othercolor_productcode.product);
    }
  }

  addToCart(bag) {
    const thisBag: Product = {
      sku: this.sku,
      name: bag.productname,
      price: bag.price,
      dis: bag.discountprice,
      off: bag.discountpriceper,
      stock: bag.StockQty,
      color: bag.color
    };
    // check user login or not
    // this.cartItem.addUserItem(thisBag);
  }

  openModal(id: string) {
    this.showLargePhoto = true;
    this.largePhotoIndex = id;
  }

  closeModal() {
    this.showLargePhoto = false;
  }

  facebookSharing() {
    window.open('https://www.facebook.com/sharer.php?u=' + encodeURIComponent(this.shareInfo.url));
  }
}
