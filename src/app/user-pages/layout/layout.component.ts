import { Level } from './../../../../../enjoy-admin/src/app/shared/models/level';
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 12:22:51
 * @LastEditTime: 2019-08-16 15:01:44
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from './../../shared/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private userService: UserService
  ) { }

  ngOnInit() {
    this.title.setTitle('My Account | Enjoybag HK');

    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        this.userService.getUserLevel(user.level).subscribe(res => {
          this.level = res.level;
        });
      } else {
        this.router.navigate(['/en/register']);
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }
  goToMembershipTC() {
    this.router.navigateByUrl('/en/FAQ/membership');
  }
}
