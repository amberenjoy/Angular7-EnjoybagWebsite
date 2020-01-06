/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-10-11 16:07:03
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../../shared/services/user.service';
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ResponsiveService } from '../../../shared/services/responsive.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})

export class UserRegisterComponent implements OnInit {

  regForm: FormGroup;
  submitted = false;
  loading = false;
  success: boolean;
  error: string;
  faCheck = faCheck;
  faMinus = faMinus;
  isMobile: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private responsiveService: ResponsiveService

  ) { }

  ngOnInit() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.router.navigate(['myEnjoybag'], { relativeTo: this.route });
      }
    });
    this.regForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      region: ['Hong Kong', Validators.required],
      areacode: [852, Validators.required],
      phone: [null, Validators.required],
      birthmonth: [null],
      newsletter: false
    });
  }

  regionChange(entry): void {
    this.regForm.controls['areacode'.toString()].setValue(entry);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.regForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.regForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.regForm.value)
      .pipe(first())
      .subscribe(data => {
        this.loading = false;
        this.success = true;
        this.submitted = false;
        this.regForm.reset();
        this.regForm.controls['areacode'.toString()].setValue(852);
        this.regForm.controls['region'.toString()].setValue('Hong Kong');
      }, error => {
        this.success = false;
        this.loading = false;
        this.error = error;
      });
  }
}
