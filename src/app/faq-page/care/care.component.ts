import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-care',
  templateUrl: './care.component.html',
  styleUrls: ['./care.component.scss']
})
export class CareComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAQ : Product Care');
  }
}
