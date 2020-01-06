/*
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-10-21 16:58:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /c:\Users\amber\Desktop\Angular\enjoybag\src\app\handbags\photo-modal\photo-modal.component.ts
 */
import { Component, OnInit, Input } from '@angular/core';
import {
  faAngleDoubleRight,
  faAngleDoubleLeft
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent implements OnInit {
  faAngleDoubleRight = faAngleDoubleRight;
  faAngleDoubleLeft = faAngleDoubleLeft;
  largePhotoArray: any = [];

  constructor() {}

  @Input() total: number;
  @Input() indexPhoto: number;
  @Input() productSku: string;

  ngOnInit() {
    for (let i = 1; i <= this.total; i++) {
      this.largePhotoArray.push({
        url: ''
      });
    }
    this.addImage();
  }

  slideToLeft() {
    if (this.indexPhoto > 0) {
      this.indexPhoto--;
      this.addImage();
    }
  }

  slideToRight() {
    if (this.indexPhoto < this.total - 1) {
      this.indexPhoto++;
      this.addImage();
    }
  }

  addImage() {
    this.largePhotoArray[
      this.indexPhoto
    ].url = `https://www.enjoybag.com.hk/photo/${this.productSku}_${this
      .indexPhoto + 1}_o.jpg`;
  }
}
