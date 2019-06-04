import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartItemService } from '../../../shared/services/cart-item.service';
import { Item } from '../../../shared/models/item';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../shared/services/authentication.service';
@Component({
  selector: 'app-header-tc',
  templateUrl: './header-tc.component.html',
  styleUrls: ['./header-tc.component.scss']
})
export class HeaderTcComponent implements OnInit {
  fixed: boolean;
  logined: boolean;
  userCurrency: string;
  userLanguage: string;
  subscription: Subscription;
  cartNum: number;
  items: Item[] = [];
  navActive = false;
  navActiveAcce = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private cartService: CartItemService
  ) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
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
  }

  changeLanguage(language: string) {
    localStorage.setItem('language', language);
    if (language === 'en') {
      const newUrl = this.router.url.replace('/tc', '/en');
      this.router.navigateByUrl(newUrl);
    } else {
      const newUrl = this.router.url.replace('/en', '/tc');
      this.router.navigateByUrl(newUrl);
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
}
