import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {


  constructor(private titleService: Title) { }
  tcStatus: Array<boolean> = [false, false, false, false, false];
  ngOnInit() {
    this.titleService.setTitle('FAQ : Privacy Policy');
  }
}
