
import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../../../shared/services/cart-item.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Item } from '../../../shared/models/item';

@Component({
  selector: 'app-user-cart-tc',
  templateUrl: './user-cart-tc.component.html',
  styleUrls: ['./user-cart-tc.component.scss']
})

export class UserCartTcComponent implements OnInit {

  hasCart: boolean;
  userCurrency: string;
  items: Item[] = [];


  constructor(private cartService: CartItemService, private authentication: AuthenticationService) { }

  ngOnInit() {
    this.userCurrency = localStorage.getItem('currency') || '';
    this.cartService.getUserCart().subscribe(res => {
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
