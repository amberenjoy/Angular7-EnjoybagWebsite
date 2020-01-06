/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 12:23:25
 * @LastEditTime: 2019-10-03 11:42:01
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../shared/services/user.service';
import { ResponsiveService } from './../../shared/services/responsive.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  uid: string;
  addressForm: FormGroup;
  addressArray = [];
  changeInput = false;
  message: string;
  addressHistory: string;
  isMobile: boolean;

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private responsiveService: ResponsiveService

  ) { }

  ngOnInit() {
    this.title.setTitle('My Account - Address Book | Enjoybag HK');
    this.addressForm = this.formBuilder.group({
      building: null,
      street: null,
      district: null,
      city: null
    });
    this.route.params.subscribe(params => {
      this.uid = params.id;
    });
    this.userService.getUserAddressBook().subscribe(res => {
      this.addressArray = res;
      if (res.length > 0) {
        this.addressForm.controls['building'.toString()].setValue(res[0].building);
        this.addressForm.controls['street'.toString()].setValue(res[0].street);
        this.addressForm.controls['district'.toString()].setValue(res[0].district);
        this.addressForm.controls['city'.toString()].setValue(res[0].city);
      } else {
        this.changeInput = true;
      }
    });
    this.userService.getUserAddressHistory().subscribe(res => {
      this.addressHistory = res.oldAddress;
    });
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  changeInfo() {
    this.message = '';
    this.changeInput = true;
  }

  cancelUpdate() {
    this.message = '';
    this.changeInput = false;
    this.addressForm.reset(this.addressArray[0]);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addressForm.controls;
  }

  saveInfo() {
    // stop here if form is invalid
    if (this.addressForm.invalid) {
      return;
    }
    console.log(this.addressForm.value);
    if (this.addressArray[0]) {
      this.userService.updateUserAddress(this.addressArray[0].id, this.addressForm.value).subscribe(res => {
        this.changeInput = false;
        this.message = res.message;
      }, err => {
        this.message = err;
      });
    } else {
      this.userService.addUserAddress(this.addressForm.value).subscribe(res => {
        this.changeInput = false;
        this.message = res.message;
      }, err => {
        this.message = err;
      });
    }

  }

}
