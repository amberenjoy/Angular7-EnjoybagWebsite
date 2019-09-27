/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-08-07 12:22:51
 * @LastEditTime: 2019-09-27 12:19:07
 * @LastEditors: Please set LastEditors
*/
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from './../../shared/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItemService } from './../../shared/services/cart-item.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user: User;
  level: string;

  constructor(
    private authenticationService: AuthenticationService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cartItemService: CartItemService
  ) { }

  ngOnInit() {
    this.title.setTitle('My Account | Enjoybag HK');

    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        this.userService.currentLevelValue().subscribe(res => {
          this.level = res.level;
        });
      } else {
        this.router.navigate(['/en/register']);
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.cartItemService.removeCart();
  }

  goToMembershipTC() {
    this.router.navigateByUrl('/en/FAQ/membership');
  }
}
