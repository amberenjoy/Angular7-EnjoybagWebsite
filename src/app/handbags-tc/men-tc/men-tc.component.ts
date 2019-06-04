import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-men-tc',
  templateUrl: './men-tc.component.html',
  styleUrls: ['./men-tc.component.scss']
})
export class MenTcComponent implements OnInit {
  paramSystem: string;
  name: string;
  constructor(private route: ActivatedRoute, private title: Title) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.paramSystem = params['name'];
      if (params['name'] === 'all') {
        this.paramSystem = 'men';
      }
    });
    this.title.setTitle('Designer ' + this.name + ' for Men | Enjoybag HK');
  }

}
