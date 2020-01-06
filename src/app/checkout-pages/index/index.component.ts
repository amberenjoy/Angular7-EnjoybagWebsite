/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 16:19:29
 * @LastEditTime: 2019-10-11 16:22:31
 * @LastEditors: Please set LastEditors
 */
import { ResponsiveService } from './../../shared/services/responsive.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  orderDisplay: boolean;
  shippingActive: boolean;
  username: string;
  isMobile: boolean;
  faUser = faUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.username = user.firstname;
      }
    });

    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

}
