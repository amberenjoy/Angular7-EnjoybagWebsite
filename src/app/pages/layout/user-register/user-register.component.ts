import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../../shared/services/user.service';

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
