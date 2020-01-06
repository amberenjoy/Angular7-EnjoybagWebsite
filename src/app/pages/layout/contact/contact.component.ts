/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-10-15 10:26:10
 * @LastEditors: Please set LastEditors
*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../shared/services/user.service';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
import { faMap, faPhone, faClock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  message: string;
  isMobile: boolean;
  faMap = faMap;
  faPhone = faPhone;
  faClock = faClock;
  faEnvelope = faEnvelope;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comments: ['', Validators.required]
    });
  }

  sendComment() {
    if (this.contactForm.value.invalid) {
      return;
    }
    this.userService.sendComment(this.contactForm.value).subscribe(res => {
      this.message = res.message;
    });
  }

}
