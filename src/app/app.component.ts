/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-06-03 10:09:50
 * @LastEditTime: 2019-10-09 11:56:06
 * @LastEditors: Please set LastEditors
*/
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartItemService } from './shared/services/cart-item.service';
import { CategoriesService } from './shared/services/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    private cartItemService: CartItemService,
    private categoriesService: CategoriesService
  ) {

    // subscribes every changes of your route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // scroll to top
        window.scrollTo(0, 0);
      }
    });

    this.categoriesService.getBagCategories('women');
    this.categoriesService.getBagCategories('accessories');
    this.cartItemService.findUserCart();

  }

}
