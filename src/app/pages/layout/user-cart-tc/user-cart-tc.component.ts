
import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../../../shared/services/cart-item.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Item } from '../../../shared/models/item';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-cart-tc',
  templateUrl: './user-cart-tc.component.html',
  styleUrls: ['./user-cart-tc.component.scss']
})

export class UserCartTcComponent implements OnInit {

  hasCart: boolean;
  userCurrency: string;
  items: Item[] = [];
  subscription: Subscription;
  subscription2: Subscription;

  constructor(private cartService: CartItemService, private authentication: AuthenticationService) { }

  ngOnInit() {
    this.userCurrency = localStorage.getItem('currency') || '';
    this.subscription = this.cartService.findUserCart().subscribe(res => {
      this.items = res;
    });
  }

  subtotal() {
    let total = 0;
    this.items.forEach(bag => {
      if (bag.product.dis !== '0') {
        total = total + bag.qty * Number(bag.product.dis);
      } else {
        total = total + bag.qty * Number(bag.product.price);
      }
    });
    return total;
  }
}
