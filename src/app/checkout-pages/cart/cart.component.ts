/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-10-11 16:15:34
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Item } from '../../shared/models/item';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { CartItemService } from '../../shared/services/cart-item.service';
import { CheckoutService } from './../../shared/services/checkout.service';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: Item[] = [];
  loading = false;
  userLevel: string;
  logined: boolean;
  discount = 0;
  userCurrency: string;
  checkForm: FormGroup;
  couponBonus = {
    amount: 0,
    discount: 0
  };
  message: string;
  isMobile: boolean;
  faTimes = faTimes;

  @ViewChild('cashCode', { static: false }) cashCode: ElementRef;

  constructor(
    private title: Title,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartItemService,
    private userService: UserService,
    private checkoutService: CheckoutService,
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    this.title.setTitle('Checkout - Shopping Cart | Enjoybag HK');
    this.userCurrency = localStorage.getItem('currency') || 'HKD';

    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.logined = true;
        this.userService.currentLevelValue().subscribe(res => {
          if (res.level) {
            this.userLevel = res.level;
            this.discount = res.promotion;
          } else {
            this.userService.getUserLevel(user.level);
          }
        });
      } else {
        this.logined = false;
      }
    });
    this.cartService.getUserCart().subscribe(res => {
      this.items = res;
    });
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  deleteItem(item) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.cartService.removeUserItem(item.product.sku, this.logined);
  }
  changeCode() {
    this.message = '';
    this.couponBonus.discount = 0;
    this.couponBonus.amount = 0;
  }
  applyCode() {
    this.message = '';
    this.loading = true;
    const code = this.cashCode.nativeElement.value.toLowerCase();
    this.checkoutService.verifyCode(code, this.subtotal()).subscribe(res => {
      this.loading = false;
      if (res.status) {
        if (res.type === 'fixed amount') {
          this.couponBonus.amount = res.amount;
        } else {
          this.couponBonus.discount = res.amount;
        }
      } else {
        this.message = res.message;
      }
    }, err => {
      this.loading = false;
      this.message = err;
    });
  }

  subtotal() {
    let subtotal = 0;
    this.items.forEach(bag => {
      if (bag.product.dis !== '0') {
        subtotal = subtotal + bag.qty * Number(bag.product.dis);
      } else {
        subtotal = subtotal + bag.qty * Number(bag.product.price) * (1 - this.discount / 100);
      }
    });
    return subtotal;
  }

  total() {
    return this.subtotal() * (1 - this.couponBonus.discount / 100) - this.couponBonus.amount;
  }

  goToShipping() {
    // check sku is valid and stock
    const checkoutPrice = {
      subtotal: this.subtotal(),
      bonus: this.couponBonus.amount,
      discount: this.couponBonus.discount,
      total: this.total()
    };
    localStorage.setItem('cartToShipping', JSON.stringify(checkoutPrice));
    if (this.logined) {
      this.router.navigate(['en/checkout/shipping-payment']);
    } else {
      this.router.navigate(['en/checkout/shipping-payment'], { queryParams: { client: 'guest' } });
    }
  }
}
