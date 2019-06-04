import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})

export class UserRegisterComponent implements OnInit {
  regForm: FormGroup;
  submitted = false;
  loading = false;
  areacode = '';
  success: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.router.navigate(['/en/myEnjoybag']);
    }
    this.regForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      region: ['', Validators.required],
      username: ['', Validators.required],
      lastname: ['', Validators.required],
      areacode: [this.areacode, Validators.required],
      phone: ['', Validators.required],
      address: this.formBuilder.group({
        building: [''],
        street: [''],
        district: [''],
        city: ['']
      }),
      birthmonth: [''],
      newsletter: [''],
      cartlist: [''],
      lang: ['EN'],
      istest: ['Y']
    });
  }

  regionChange(entry): void {
    this.areacode = entry;
    this.regForm.controls['areacode'.toString()].setValue(this.areacode);
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

    if (this.regForm.value['newsletter'.toString()] === true) {
      this.regForm.value['newsletter'.toString()] = 'Y';
    } else {
      this.regForm.value['newsletter'.toString()] = 'N';
    }

    this.loading = true;
    this.userService.register(this.regForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.regForm.reset();
          this.submitted = false;
          this.success = true;
          console.log('Registration successful', true);
        },
        error => {
          this.loading = false;
          this.success = false;
        });
  }
}
