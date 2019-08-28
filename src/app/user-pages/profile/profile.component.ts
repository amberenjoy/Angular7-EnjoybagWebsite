import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from './../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.title.setTitle('My Account - Profile | Enjoybag HK');

    this.userService.getUserInfo().subscribe(res => {
      this.defaultProfile = res;
      console.log(res);
      this.profileForm = this.formBuilder.group({
        firstname: [res.firstname, Validators.required],
        lastname: [res.lastname, Validators.required],
        email: [res.email, [Validators.required, Validators.email]],
        areacode: [res.areacode, Validators.required],
        phone: [res.phone, Validators.required],
        birthmonth: res.birthmonth,
        newsletter: res.newsletter
      });
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
