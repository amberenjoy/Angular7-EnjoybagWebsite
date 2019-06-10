import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-user-register-page-tc',
  templateUrl: './user-register-page-tc.component.html',
  styleUrls: ['./user-register-page-tc.component.scss']
})
export class UserRegisterPageTcComponent implements OnInit {

  page = 'register';
  returnUrl: string;

  constructor(
    private title: Title,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['en/myEnjoybag']);
    }
    this.title.setTitle('Register and login | Enjoybag HK');
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log(this.returnUrl);
  }
}