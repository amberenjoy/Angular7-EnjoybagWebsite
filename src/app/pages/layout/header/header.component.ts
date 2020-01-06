/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-10-11 15:14:17
 * @LastEditors: Please set LastEditors
*/
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartItemService } from '../../../shared/services/cart-item.service';
import { Item } from '../../../shared/models/item';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { CategoriesService } from '../../../shared/services/categories.service';
import { Category } from '../../../shared/models/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faSearch, faUser, faShoppingBag, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isMobile: boolean;
  fixed: boolean;
  cartNum: number;
  logined: boolean;
  searchForm: FormGroup;
  userCurrency: string;
  userLanguage: string;
  navActive = false;
  navActiveAcce = false;
  items: Item[] = [];
  categories: Category[];
  categoriesSLG: Category[];
  faSearch = faSearch; faUser = faUser; faShoppingBag = faShoppingBag;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private cartService: CartItemService,
    private categoriesService: CategoriesService
  ) { }

  // fixed header
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 70) {
      this.fixed = true;
    } else if (this.fixed && window.pageYOffset <= 70) {
      this.fixed = false;
    }
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    // get language and currency
    this.userCurrency = localStorage.getItem('currency') || 'HKD';
    this.userLanguage = localStorage.getItem('language') || '';
    if (!this.userLanguage) {
      const pathLan = this.router.url.split('/')[1];
      this.userLanguage = pathLan;
      localStorage.setItem('language', pathLan);
    }
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
    // create search form
    this.createSearchForm();
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
  }

  changeLanguage(language: string) {
    localStorage.setItem('language', language);
    if (language === 'en') {
      const newUrl = this.router.url.replace('/tc', '/en');
      window.location.href = newUrl;
    } else {
      const newUrl = this.router.url.replace('/en', '/tc');
      window.location.href = newUrl;
    }
  }

  changeCurrency(currency: string) {
    localStorage.setItem('currency', currency);
    location.reload();
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      searchName: new FormControl('', Validators.required)
    });
  }

  searchKey(event) {
    if (event.keyCode === 13 && event.target.value !== '') {
      const value = event.target.value;
      event.preventDefault();
      // 重复点击菜单刷新界面 网上没找到方法 通过跳转到别的界面在跳回来的方式进行实现
      this.router.navigateByUrl('/en/home').then(() => {
        this.router.navigate(['/en/products/search'], { queryParams: { qry: value } });
      });
    } else {
      this.searchForm.controls['searchName'.toString()].setErrors({ incorrect: true });
    }
  }

}
