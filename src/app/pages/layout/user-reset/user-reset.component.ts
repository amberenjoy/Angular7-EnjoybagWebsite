import { ActivatedRoute } from '@angular/router';
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 14:22:50
 * @LastEditTime: 2019-09-30 17:20:15
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-reset',
  templateUrl: './user-reset.component.html',
  styleUrls: ['./user-reset.component.scss']
})
export class UserResetComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  message: string;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.route.params.subscribe(params => {
      const token = params.token;
      if (token) {
        this.userService.resetPasswordLink(token).subscribe(res => {
          console.log(res);
          if (res.email) {
            this.resetForm.controls['email'.toString()].setValue(res.email);
          }
        }, err => {
          console.log(err);
          this.router.navigate(['/en/forgot-password']);
        });
      } else {
        this.router.navigate(['/en/forgot-password']);
      }
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

    console.log(this.resetForm.value);

    this.loading = true;
    this.userService.updatePasswordViaEmail(this.resetForm.value).subscribe(res => {
      this.message = res.message;
    });
  }


}
