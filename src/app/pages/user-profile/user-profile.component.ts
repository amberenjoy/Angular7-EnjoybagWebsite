import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from './../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  changeInput: boolean;
  userCurrency: string;
  orderShow = false;
  profileShow = false;
  user: User;
  profile: any;
  orderArray: [];

  constructor(
    private authenticationService: AuthenticationService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.userCurrency = localStorage.getItem('currency') || 'HKD';
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.router.navigate(['/en/home']);
      }
    });
    this.changeInput = false;
    this.title.setTitle('My Account | Enjoybag HK');
  }

  logout() {
    this.authenticationService.logout();
  }
  openProfile() {
    this.userService.getUserInfo(this.user.id).subscribe(res => {
      this.profile = res;
      this.orderShow = false;
      this.profileShow = true;
    });
  }
  openOrderList() {
    this.orderService.getUserOrders().subscribe(orderlist => {
      this.orderArray = orderlist.orders;
      console.log(this.orderArray);
      this.orderShow = true;
      this.profileShow = false;
    });
  }
  openOrder(id) {
    this.router.navigate(['/en/checkout/track-order', id]);
  }

  changeInfo() {
    this.changeInput = true;
  }
  saveInfo() {
    this.changeInput = false;
  }
}