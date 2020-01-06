/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-07-05 14:52:13
 * @LastEditors: your name
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-line-tc',
  templateUrl: './line-tc.component.html',
  styleUrls: ['./line-tc.component.scss']
})
export class LineTcComponent implements OnInit {

  line = '';
  constructor(private route: ActivatedRoute, private title: Title) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.line = params['line'.toString()];
    });
    this.title.setTitle('Designer special collections: ' + this.line + ' | Enjoybag HK');
  }

}

