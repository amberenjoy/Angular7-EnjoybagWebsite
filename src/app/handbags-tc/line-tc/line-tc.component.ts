import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-line-tc',
  templateUrl: './line-tc.component.html',
  styleUrls: ['./line-tc.component.scss']
})
export class LineTcComponent implements OnInit {
  paramSystem: string;
  key: string;
  constructor(private route: ActivatedRoute, private title: Title) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['key'] === 'ZHU') {
        this.paramSystem = 'campaign_special';
      } else if (params['key'] === 'EJ') {
        this.paramSystem = 'gift';
      }
      this.key = params['key'];
    });
    this.title.setTitle('Designer special collections: ' + this.key + ' | Enjoybag HK');
  }

}
