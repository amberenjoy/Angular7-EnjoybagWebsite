/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-08-16 15:47:11
 * @LastEditors: Please set LastEditors
*/
import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../../../shared/services/cart-item.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { UserService } from './../../../shared/services/user.service';
import { Item } from '../../../shared/models/item';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

  hasCart: boolean;
  userCurrency: string;
  items: Item[];
  userLevel: string;
  discount = 0;

  constructor(
    private cartService: CartItemService,
    private authentication: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userCurrency = localStorage.getItem('currency') || '';
    this.cartService.getUserCart().subscribe(res => {
      this.items = res;
    });
    this.authentication.currentUser.subscribe(user => {
      if (user) {
        this.userService.getUserLevel(user.level).subscribe(res => {
          this.userLevel = res.level;
          this.discount = res.promotion;
        });
      }
    });
  }

  subtotal() {
    let total = 0;
    this.items.forEach(bag => {
      if (bag.product.dis !== '0') {
        total = total + bag.qty * Number(bag.product.dis);
      } else {
        total = total + bag.qty * Number(bag.product.price) * (100 - this.discount) / 100;
      }
    });
    return total;
  }
}
