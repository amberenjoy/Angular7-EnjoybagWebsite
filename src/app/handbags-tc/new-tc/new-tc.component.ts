/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-09-30 15:19:40
 * @LastEditors: Please set LastEditors
 */

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-tc',
  templateUrl: './new-tc.component.html',
  styleUrls: ['./new-tc.component.scss']
})
export class NewTcComponent implements OnInit {
  key = '';

  constructor(
    private title: Title,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.title.setTitle('Designer New: Handbags and Accessories | Enjoybag HK');
    this.route.params.subscribe(params => {
      this.key = params.key;
      if (this.key === 'discount') {
        this.title.setTitle('Designer Sale: Handbags and Accessories  | Enjoybag HK');
      }
    });
  }

}
