import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  constructor(private titleService: Title) { }
  deliveryStatus: Array<boolean> = [false, false, false, false, false];
  ngOnInit() {
    this.titleService.setTitle('FAQ : Delivery and Returns');
  }

}
