/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 10:20:31
 * @LastEditTime: 2019-09-03 16:02:32
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss']
})
export class PasswordPageComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['amberenjoy@outlook.com', [Validators.required, Validators.email]]
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.forgotPassword(this.resetForm.value).subscribe(res => {
      console.log(res);
      this.message = res.message;
    });
  }
}
