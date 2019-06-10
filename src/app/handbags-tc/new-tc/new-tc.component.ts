
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-tc',
  templateUrl: './new-tc.component.html',
  styleUrls: ['./new-tc.component.scss']
})
export class NewTcComponent implements OnInit {
  key: string;
  constructor(
    private title: Title,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.title.setTitle('Designer New| Enjoybag HK');
    this.route.params.subscribe(params => {
      this.key = params.key;
      this.title.setTitle('Designer ' + this.key.charAt(0).toUpperCase() + this.key.slice(1) + ': Handbags and Accessories  | Enjoybag HK');
      if (this.key === 'discount') {
        this.title.setTitle('Designer Sale: Handbags and Accessories  | Enjoybag HK');
      }
    });
  }

}
