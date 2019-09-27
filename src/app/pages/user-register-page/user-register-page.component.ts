/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-09-25 17:31:15
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ResponsiveService } from './../../shared/services/responsive.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserLoginComponent } from '../layout/user-login/user-login.component';
import { UserRegisterComponent } from '../layout/user-register/user-register.component';

@Component({
  selector: 'app-user-register-page',
  templateUrl: './user-register-page.component.html',
  styleUrls: ['./user-register-page.component.scss']
})
export class UserRegisterPageComponent implements OnInit {

  page = 'register';
  returnUrl: string;
  isMobile: boolean;
  components = [UserLoginComponent, UserRegisterComponent];
  currentComponent = null;
  registerMobile = false;

  constructor(
    private title: Title,
    private router: Router,
    private authenticationService: AuthenticationService,
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['en/myEnjoybag']);
    }
    this.title.setTitle('Register and login | Enjoybag HK');
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log(this.returnUrl);

    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  render(index) {
    this.currentComponent = this.components[index];
  }

  scrollTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
}

