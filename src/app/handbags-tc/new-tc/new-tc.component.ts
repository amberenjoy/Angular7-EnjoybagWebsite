import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-new-tc',
  templateUrl: './new-tc.component.html',
  styleUrls: ['./new-tc.component.scss']
})
export class NewTcComponent implements OnInit {

  paramSystem = 'new';

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Designer New: Handbags and Accessories | Enjoybag HK');
  }

}
