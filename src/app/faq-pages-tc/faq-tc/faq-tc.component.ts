import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq-tc',
  templateUrl: './faq-tc.component.html',
  styleUrls: ['./faq-tc.component.scss']
})
export class FaqTcComponent implements OnInit {

  constructor(private titleService: Title, public route: Router) { }
  infoStatus: Array<boolean> = [false, false, false, false, false];

  ngOnInit() {
    this.titleService.setTitle('FAQ | Enjoybag HK');
  }

}
