import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tc',
  templateUrl: './tc.component.html',
  styleUrls: ['./tc.component.scss']
})
export class TcComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAQ : Terms and Conditions');
  }
}
