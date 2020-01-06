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
  selector: 'app-men-tc',
  templateUrl: './men-tc.component.html',
  styleUrls: ['./men-tc.component.scss']
})
export class MenTcComponent implements OnInit {

  name = '';
  constructor(private route: ActivatedRoute, private title: Title) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['name'.toString()];
      this.title.setTitle('Designer ' + this.name + ' for Men | Enjoybag HK');
    });
  }

}
