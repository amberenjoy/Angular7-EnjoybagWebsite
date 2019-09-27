/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-09-23 17:10:52
 * @LastEditors: Please set LastEditors
*/
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartItemService } from '../../../shared/services/cart-item.service';
import { Item } from '../../../shared/models/item';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { CategoriesService } from '../../../shared/services/categories.service';
import { Category } from '../../../shared/models/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isMobile: boolean;
  fixed: boolean;
  logined: boolean;
  userCurrency: string;
  userLanguage: string;
  subscription: Subscription;
  cartNum: number;
  items: Item[] = [];
  navActive = false;
  navActiveAcce = false;
  categories: Category[];
  categoriesSLG: Category[];
  searchItem: string;
  searchForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private cartService: CartItemService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    // get women nav category
    this.categoriesService.getCategories().subscribe(res => {
      this.categories = res;
      this.categories.forEach(element => {
        element.name = element.name.toLowerCase();
        element.url = element.name.replace(' ', '-');
      });
    });
    this.categoriesService.getSLGCategories().subscribe(res => {
      this.categoriesSLG = res;
      this.categoriesSLG.forEach(element => {
        element.name = element.name.toLowerCase();
        element.url = element.name.replace(' ', '-');
      });
    });
    // get language
    this.userLanguage = localStorage.getItem('language') || '';
    if (!this.userLanguage) {
      const pathLan = this.router.url.split('/')[1];
      this.userLanguage = pathLan;
      localStorage.setItem('language', pathLan);
    }
    this.userCurrency = localStorage.getItem('currency') || 'HKD';
    // check login
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.logined = true;
      } else {
        this.logined = false;
      }
    });
    // get cart num
    this.cartService.getCartQty().subscribe(res => {
      this.cartNum = res;
    });
    // active women or accessories when route change
    const urlTreeNow = this.router.url.split('/')[3];
    if (urlTreeNow === 'women' || urlTreeNow === 'collections') {
      this.navActive = true;
      this.navActiveAcce = false;
    } else if (urlTreeNow === 'accessories') {
      this.navActiveAcce = true;
      this.navActive = false;
    }
    this.router.events.subscribe(event => {
      const urlTreeChange = this.router.url.split('/')[3];
      if (urlTreeChange === 'women' || urlTreeChange === 'collections') {
        this.navActive = true;
        this.navActiveAcce = false;
      } else if (urlTreeChange === 'accessories') {
        this.navActiveAcce = true;
        this.navActive = false;
      }
    });

    this.createForm();
  }

  changeLanguage(language: string) {
    localStorage.setItem('language', language);
    if (language === 'en') {
      const newUrl = this.router.url.replace('/tc', '/en');
      // this.router.navigateByUrl(newUrl);
      window.location.href = newUrl;
    } else {
      const newUrl = this.router.url.replace('/en', '/tc');
      // this.router.navigateByUrl(newUrl);
      window.location.href = newUrl;
    }
  }

  changeCurrency(currency: string) {
    localStorage.setItem('currency', currency);
    location.reload();
  }

  // fixed header
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 70) {
      this.fixed = true;
    } else if (this.fixed && window.pageYOffset <= 70) {
      this.fixed = false;
    }
  }

  createForm() {
    this.searchForm = new FormGroup({
      searchName: new FormControl('', Validators.required)
    });
  }

  searchKey(event, value) {
    if (event.keyCode === 13) {
      this.searchBtn(event, value);
    }
  }

  searchBtn(event, value) {
    event.preventDefault();
    if (value !== '') {
      // 重复点击菜单刷新界面 网上没找到方法 通过跳转到别的界面在跳回来的方式进行实现
      this.router.navigateByUrl('/en/home').then(() => {
        this.router.navigate(['/en/products/search'], { queryParams: { qry: value } });
      });
    } else {
      this.searchForm.controls['searchName'.toString()].setErrors({ incorrect: true });
    }
  }
}
