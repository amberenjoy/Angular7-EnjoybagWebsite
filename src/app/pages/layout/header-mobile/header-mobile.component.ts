/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-09-23 12:53:45
 * @LastEditTime: 2019-09-23 17:08:42
 * @LastEditors: Please set LastEditors
*/
import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from './../../../shared/services/responsive.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItemService } from '../../../shared/services/cart-item.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit {

  openSideNav = false;
  openSearch: boolean;
  searchForm: FormGroup;
  searchItem: string;
  cartNum: number;
  logined: boolean;

  constructor(
    private router: Router,
    private responsiveService: ResponsiveService,
    private cartService: CartItemService,
    private authenticationService: AuthenticationService,
  ) { }


  ngOnInit() {
    this.createForm();
    // get cart num
    this.cartService.getCartQty().subscribe(res => {
      this.cartNum = res;
    });

    // check login
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.logined = true;
      } else {
        this.logined = false;
      }
    });
  }
  createForm() {
    this.searchForm = new FormGroup({
      searchName: new FormControl('', Validators.required)
    });
  }
  toggleSideMenu() {
    this.responsiveService.listenMobileSide(this.openSideNav);
  }
  searchKey(event, value) {
    if (event.keyCode === 13) {
      this.searchBtn(event, value);
    }
  }
  searchBtn(event, value) {
    event.preventDefault();
    if (value !== '') {
      this.openSearch = false;
      // 重复点击菜单刷新界面 网上没找到方法 通过跳转到别的界面在跳回来的方式进行实现
      this.router.navigateByUrl('/en/home').then(() => {
        this.router.navigate(['/en/products/search'], { queryParams: { qry: value } });
      });
    } else {
      this.searchForm.setErrors({ incorrect: true });
    }
  }

}
