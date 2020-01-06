/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 12:22:51
 * @LastEditTime: 2019-10-17 16:32:37
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from './../../shared/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponsiveService } from './../../shared/services/responsive.service';
import { CartItemService } from './../../shared/services/cart-item.service';
import {
  faUser,
  faQuestion,
  faMap,
  faList
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user: User;
  level: string;
  isMobile: boolean;
  faQuestion = faQuestion;
  faUser = faUser;
  faMap = faMap;
  faList = faList;

  constructor(
    private authenticationService: AuthenticationService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cartItemService: CartItemService,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit() {
    this.title.setTitle('My Account | Enjoy handbag HK');

    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        this.userService.currentLevelValue().subscribe(res => {
          this.level = res.level;
          if (!res.level) {
            this.userService.getUserLevel(this.user.level);
          }
        });
      } else {
        this.router.navigate(['en/register']);
      }
    });

    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  logout() {
    this.authenticationService.logout();
    this.cartItemService.removeCart();
  }

  goToMembershipTC() {
    this.router.navigate(['/en/FAQ/membership']);
  }
}
