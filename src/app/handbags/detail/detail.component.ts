/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-10-25 14:51:55
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Product } from './../../shared/models/product';
import { BaglistService } from '../../shared/services/baglist.service';
import { CartItemService } from './../../shared/services/cart-item.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ResponsiveService } from './../../shared/services/responsive.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
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
  faTimes = faTimes;

  addBag = false;
  subtotal = 0;
  href: any;
  keyLink: any;

  showLargePhoto = false;
  largePhotoIndex: string;
  shareInfo: any;
  logined: boolean;
  isMobile: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: BaglistService,
    private title: Title,
    private meta: Meta,
    private cartItem: CartItemService,
    private authentication: AuthenticationService,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit() {
    // get currency
    this.userCurrency = localStorage.getItem('currency') || 'HKD';
    // reload the current route with the angular  router
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.route.paramMap.subscribe(params => {
      this.sku = +params.get('sku'); // (+) converts string 'id' to a number
      this.dataService
        .getBag(this.sku, 'EN', this.userCurrency)
        .subscribe(results => {
          this.loading = false;
          this.bag = results;
          this.getAllInfo(this.bag);
        });
      this.key = params.get('key') || params.get('name') || params.get('line');
      if (!this.key || this.key === 'all') {
        this.key = this.router.url.split('/')[3];
        if (this.key === 'discount') {
          this.key = 'sale';
        }
      }
    });

    this.authentication.currentUser.subscribe(res => {
      if (res) {
        this.logined = true;
      } else {
        this.logined = false;
      }
    });

    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  getAllInfo(bag) {
    this.title.setTitle(
      `Designer ${bag['productname'.toString()]} | Enjoy Handbag HK`
    );

    this.meta.addTag({
      name: 'description',
      content: bag['Description'.toString()]
    });
    this.meta.addTag({
      name: 'keywords',
      content: bag['productname'.toString()]
    });

    this.shareInfo = {
      title: bag.productname,
      desc: bag.Description,
      url:
        'https://www.enjoybag.com.hk/product-info.html?lan=EN&sku=' + this.sku,
      imgurl: 'https://www.enjoybag.com.hk/photo/' + this.sku + '_1_c.jpg'
    };

    for (let i = 1; i <= bag.photono; i++) {
      this.bagPhotoArray.push({
        url:
          'https://www.enjoybag.com.hk/photo/' + this.sku + '_' + i + '_c.jpg',
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
    if (
      !bag.othercolor_productcode ||
      bag.othercolor_productcode['totalcolor'.toString()] === '0'
    ) {
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
    this.cartItem.addUserItem(thisBag.sku, this.logined);
  }

  openModal(id: string) {
    this.showLargePhoto = true;
    this.largePhotoIndex = id;
  }

  closeModal() {
    this.showLargePhoto = false;
  }

  facebookSharing() {
    window.open(
      'https://www.facebook.com/sharer.php?u=' +
        encodeURIComponent(this.shareInfo.url)
    );
  }
}
