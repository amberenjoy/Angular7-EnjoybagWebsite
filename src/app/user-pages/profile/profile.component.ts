/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-08-07 12:23:06
* @LastEditTime: 2019-10-03 11:30:27
* @LastEditors: Please set LastEditors
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from './../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ResponsiveService } from './../../shared/services/responsive.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  changeInput: boolean;
  userCurrency: string;
  user: User;
  profileForm: FormGroup;
  message: string;
  defaultProfile: object;
  uid: string;
  isMobile: boolean;

  constructor(
    private title: Title,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    this.title.setTitle('My Account - Profile | Enjoybag HK');
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.uid = user.id;
        this.userService.getUserInfo(user.id).subscribe(res => {
          this.defaultProfile = res;
          this.profileForm = this.formBuilder.group({
            firstname: [res.firstname, Validators.required],
            lastname: [res.lastname, Validators.required],
            email: [res.email, [Validators.required, Validators.email]],
            areacode: res.areacode,
            phone: res.phone,
            birthmonth: res.birthmonth,
            newsletter: [{ value: res.newsletter, disabled: true }]
          });
        });
      } else {
        this.router.navigate(['en/register']);
      }
    });
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  changeInfo() {
    this.changeInput = true;
    this.profileForm.controls['newsletter'.toString()].enable();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.profileForm.controls;
  }

  saveInfo() {
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    console.log(this.profileForm.value);
    this.userService.updateUserInfo(this.profileForm.value).subscribe(res => {
      this.changeInput = false;
      this.message = res.message;
    }, err => {
      this.message = err;
    });
  }

  cancelUpdate() {
    this.changeInput = false;
    this.profileForm.setValue(this.defaultProfile);
  }
}
