import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sale-tc',
  templateUrl: './sale-tc.component.html',
  styleUrls: ['./sale-tc.component.scss']
})
export class SaleTcComponent implements OnInit {

  constructor(private title: Title) { }
  paramSystem = 'discount';
  ngOnInit() {
    this.title.setTitle('Designer Sale: Handbags and Accessories | Enjoybag HK');

  }
}
