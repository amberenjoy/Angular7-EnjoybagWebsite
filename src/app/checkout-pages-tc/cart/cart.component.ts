/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:12
 * @LastEditTime: 2019-08-20 10:01:28
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Item } from '../../shared/models/item';
import { User } from '../../shared/models/user';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { CartItemService } from '../../shared/services/cart-item.service';
import { CheckoutService } from './../../shared/services/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  checkForm: FormGroup;
  items: Item[] = [];
  loading = false;
  logined: boolean;
  currentUser: User;
  userCurrency: string;
  couponBonus: any = {};
  @ViewChild('cashCode', { static: false }) cashCode: ElementRef;
  message: string;

  constructor(
    private cartService: CartItemService,
    private authenticationService: AuthenticationService,
    private title: Title,
    private router: Router,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    this.userCurrency = localStorage.getItem('currency') || 'HKD';
    this.title.setTitle('Shopping Cart | Enjoybag HK');
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.logined = true;
      } else {
        this.logined = false;
      }
    });
    this.cartService.getUserCart().subscribe(res => {
      this.items = res;
    });
  }

  deleteItem(item) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.cartService.removeUserItem(item.product.sku, this.logined);
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
        subtotal = subtotal + bag.qty * Number(bag.product.price);
      }
    });
    return subtotal;
  }

  total() {
    if (this.couponBonus.amount || this.couponBonus.discount) {
      let subtotal = this.subtotal();
      const discount = parseFloat(this.couponBonus.discount || '0%');
      const amount = this.couponBonus.amount || ('-' + JSON.stringify((subtotal * discount / 100)));
      subtotal = subtotal + parseInt(amount, 10);
      return subtotal;
    } else {
      return this.subtotal();
    }
  }

  goToShipping() {
    // check sku is valid and stock
    const checkoutPrice = {
      subtotal: this.subtotal(),
      bonus: this.couponBonus.amount || '',
      discount: this.couponBonus.discount || '',
      total: this.total()
    };
    localStorage.setItem('cartToShipping', JSON.stringify(checkoutPrice));
    if (this.logined) {
      this.router.navigate(['tc/checkout/step-2']);
    } else {
      this.router.navigate(['tc/checkout/step-2'], { queryParams: { client: 'guest' } });
    }
  }
}
