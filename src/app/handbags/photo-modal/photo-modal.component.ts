import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent implements OnInit {

  constructor() { }
  @Input() parameter: number;
  @Input() indexPhoto: number;
  @Input() productSku: string;
  largePhotoArray: any = [];
  ngOnInit() {
    for (let i = 1; i <= this.parameter; i++) {
      this.largePhotoArray.push({
        url: 'https://www.enjoybag.com.hk/photo/' + this.productSku + '_' + i + '_o.jpg',
        show: false
      });
    }
  }
  slideToLeft() {
    if (this.indexPhoto > 0) {
      this.indexPhoto--;
    }
  }
  slideToRight() {
    if (this.indexPhoto < this.parameter - 1) {
      this.indexPhoto++;
    }
  }
}
