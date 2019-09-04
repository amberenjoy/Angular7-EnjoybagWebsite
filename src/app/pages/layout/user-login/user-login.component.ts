/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-09-04 16:52:40
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { User } from '../../../shared/models/user';
import { CartItemService } from '../../../shared/services/cart-item.service';
import { UserService } from '../../../shared/services/user.service';
import { CheckoutService } from '../../../shared/services/checkout.service';

declare var FB: any;

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})

export class UserLoginComponent implements OnInit {
  @Input() class: string;  // get parent parameters, key= discount/new/slg
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  logined: boolean;
  loading = false;
  failed = false;
  user: User;
  cartNum: number;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartItemService,
    private checkoutService: CheckoutService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        this.logined = true;

        this.cartService.getCartQty().subscribe(res => {
          this.cartNum = res;
        });
        this.checkoutService.getOrderQty().subscribe(res => {
          this.user.orders = res;
        });

      } else {
        this.logined = false;
      }
    });

    this.loginForm = this.formBuilder.group({
      email: [
        localStorage.getItem('rememberEmail') ? localStorage.getItem('rememberEmail') : null,
        [Validators.required, Validators.email]
      ],
      password: [null, Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()];


    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: '1032790253567506',
        cookie: true,
        xfbml: true,
        version: 'v4.0'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value).subscribe(
      data => {
        this.user = data;
        localStorage.setItem('rememberEmail', this.f.email.value);
        // check where user login
        if (this.returnUrl) {
          console.log(this.returnUrl);
          this.router.navigate([this.returnUrl]);
        } else if (this.route.routeConfig.path === 'register' || this.router.url.split('/')[2] === 'register') {
          this.router.navigate(['/en/myEnjoybag']);
        } else {
          this.logined = true;
        }

        this.cartService.findUserCart();
        this.userService.getUserLevel(data.level);

        const localCartList = localStorage.getItem('cartList');
        if (localCartList) {
          const cartArray = localCartList.split('-');
          cartArray.shift();
          localStorage.removeItem('cartList');
          for (const each of cartArray) {
            this.cartService.addUserItem(each, true);
          }
        }

        this.cartService.getCartQty().subscribe(res => {
          this.cartNum = res;
        });
      },
      error => {
        this.loading = false;
        this.failed = true;
        this.error = error;
      }
    );
  }

  logout() {
    this.logined = false;
    this.loading = false;
    this.loginForm.markAsPristine();
    this.authenticationService.logout();
    this.cartService.removeCart();
  }

  socialSignIn(platform: string): void {
    console.log(platform);
    // FB.login();
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        this.authenticationService.loginWithFB(response.authResponse).subscribe(res => {
          console.log(res);
        });
      } else {
        console.log('User login failed');
      }
    });

  }
  // socialSignIn(socialPlatform: string) {
  //   let socialPlatformProvider;
  //   if (socialPlatform === 'facebook') {
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_TYPE;
  //   }

  //   this.socialAuthService.signIn(socialPlatformProvider).then(
  //     (socialUser) => {
  //       console.log(socialPlatform + ' sign in data : ', socialUser);
  //       // Now sign-in with userData
  //     });
  // }


}

