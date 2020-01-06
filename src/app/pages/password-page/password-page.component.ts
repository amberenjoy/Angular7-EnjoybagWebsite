/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 10:20:31
 * @LastEditTime: 2019-10-17 16:34:59
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss']
})
export class PasswordPageComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  message: string;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Recover password | Enjoy handbag HK');
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.forgotPassword(this.resetForm.value).subscribe(res => {
      this.message = res.message;
      this.submitted = false;
    });
  }
}
